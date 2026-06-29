<?php
/**
 * queue.php  –  Queue Ticketing API
 *
 * POST /queue.php          → issue a new ticket
 * GET  /queue.php          → fetch queue status for all services
 * GET  /queue.php?service= → fetch queue status for one service
 * GET  /queue.php?ticket=  → fetch a single ticket by ticket_number
 *
 * Responses are JSON.  HTTP status codes follow REST conventions.
 *
 * CORS headers allow the React dev server (localhost:*) to call
 * this endpoint during development.  Tighten for production.
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';

/* ---------------------------------------------------------------
   Helpers
--------------------------------------------------------------- */

function json_response(mixed $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function error_response(string $message, int $status = 400): never
{
    json_response(['success' => false, 'error' => $message], $status);
}

/* ---------------------------------------------------------------
   CORS  (adjust $allowed_origins for production)
--------------------------------------------------------------- */

$allowed_origins = ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
} else {
    // Allow any origin in development; restrict in production
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/* ---------------------------------------------------------------
   Service catalogue  (must match schema ENUM + React SERVICES)
--------------------------------------------------------------- */

const SERVICES = [
    'licensing'   => ['en' => 'Licensing',             'ms' => 'Pelesenan',               'prefix' => 'A', 'counter' => 'Counter 1'],
    'assessment'  => ['en' => 'Assessment & Tax',       'ms' => 'Taksiran & Cukai',        'prefix' => 'B', 'counter' => 'Counter 2'],
    'engineering' => ['en' => 'Engineering',            'ms' => 'Kejuruteraan',            'prefix' => 'C', 'counter' => 'Counter 3'],
    'health'      => ['en' => 'Health & Environment',   'ms' => 'Kesihatan & Alam Sekitar','prefix' => 'D', 'counter' => 'Counter 4'],
    'general'     => ['en' => 'General Inquiries',      'ms' => 'Pertanyaan Am',           'prefix' => 'E', 'counter' => 'Counter 5'],
];

const AVG_SERVICE_MINUTES = 5;

/* ---------------------------------------------------------------
   Router
--------------------------------------------------------------- */

$method = $_SERVER['REQUEST_METHOD'];

match ($method) {
    'POST' => handle_post(),
    'GET'  => handle_get(),
    default => error_response('Method not allowed', 405),
};

/* ---------------------------------------------------------------
   POST  –  Issue a new ticket
   Body (JSON): { "service_key": "licensing" }
--------------------------------------------------------------- */

function handle_post(): never
{
    $body = json_decode(file_get_contents('php://input'), true);

    if (!is_array($body) || empty($body['service_key'])) {
        error_response('Missing required field: service_key');
    }

    $service_key = strtolower(trim($body['service_key']));

    if (!array_key_exists($service_key, SERVICES)) {
        error_response('Invalid service_key. Must be one of: ' . implode(', ', array_keys(SERVICES)));
    }

    $svc = SERVICES[$service_key];

    try {
        $pdo = db();

        /*
         * Atomically increment the daily sequence for this service.
         * If the stored reset_date is before today, restart from 1.
         */
        $pdo->beginTransaction();

        $stmt = $pdo->prepare(
            'SELECT last_seq, reset_date FROM Queue_Sequences
              WHERE service_key = :key FOR UPDATE'
        );
        $stmt->execute([':key' => $service_key]);
        $row = $stmt->fetch();

        $today     = date('Y-m-d');
        $last_seq  = (int)($row['last_seq'] ?? 0);
        $reset_date = $row['reset_date'] ?? $today;

        if ($reset_date < $today) {
            // New day — reset sequence
            $last_seq = 0;
        }

        $next_seq = $last_seq + 1;

        $pdo->prepare(
            'INSERT INTO Queue_Sequences (service_key, last_seq, reset_date)
             VALUES (:key, :seq, :date)
             ON DUPLICATE KEY UPDATE last_seq = :seq, reset_date = :date'
        )->execute([':key' => $service_key, ':seq' => $next_seq, ':date' => $today]);

        // Format ticket number, e.g. "A043"
        $ticket_number = $svc['prefix'] . str_pad((string)$next_seq, 3, '0', STR_PAD_LEFT);

        // Count how many are already waiting (for wait-time estimate)
        $wait_stmt = $pdo->prepare(
            'SELECT COUNT(*) FROM Queue_Tickets
              WHERE service_key = :key AND status = \'waiting\''
        );
        $wait_stmt->execute([':key' => $service_key]);
        $waiting_ahead = (int)$wait_stmt->fetchColumn();

        $estimated_wait = ($waiting_ahead + 1) * AVG_SERVICE_MINUTES;

        // Insert the ticket
        $ins = $pdo->prepare(
            'INSERT INTO Queue_Tickets
               (ticket_number, service_key, service_en, service_ms, status, issued_at)
             VALUES
               (:number, :key, :en, :ms, \'waiting\', NOW())'
        );
        $ins->execute([
            ':number' => $ticket_number,
            ':key'    => $service_key,
            ':en'     => $svc['en'],
            ':ms'     => $svc['ms'],
        ]);

        $ticket_id = (int)$pdo->lastInsertId();

        $pdo->commit();

        json_response([
            'success'         => true,
            'ticket' => [
                'id'                     => $ticket_id,
                'ticket_number'          => $ticket_number,
                'service_key'            => $service_key,
                'service_en'             => $svc['en'],
                'service_ms'             => $svc['ms'],
                'counter_label'          => $svc['counter'],
                'status'                 => 'waiting',
                'issued_at'              => date('c'),
                'waiting_ahead'          => $waiting_ahead,
                'estimated_wait_minutes' => $estimated_wait,
            ],
        ], 201);

    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        error_response('Database error: ' . $e->getMessage(), 500);
    }
}

/* ---------------------------------------------------------------
   GET  –  Queue status
   ?service=licensing  → one service
   ?ticket=A043        → single ticket lookup
   (no params)         → all services summary
--------------------------------------------------------------- */

function handle_get(): never
{
    // Single ticket lookup
    if (!empty($_GET['ticket'])) {
        $ticket_number = strtoupper(trim($_GET['ticket']));

        $stmt = db()->prepare(
            'SELECT id, ticket_number, service_key, service_en, service_ms,
                    status, issued_at, called_at, closed_at, counter_label
               FROM Queue_Tickets
              WHERE ticket_number = :number
              ORDER BY issued_at DESC
              LIMIT 1'
        );
        $stmt->execute([':number' => $ticket_number]);
        $ticket = $stmt->fetch();

        if (!$ticket) {
            error_response("Ticket {$ticket_number} not found", 404);
        }

        // How many waiting ahead of this ticket in the same service?
        $ahead_stmt = db()->prepare(
            'SELECT COUNT(*) FROM Queue_Tickets
              WHERE service_key = :key
                AND status = \'waiting\'
                AND issued_at < :issued_at'
        );
        $ahead_stmt->execute([':key' => $ticket['service_key'], ':issued_at' => $ticket['issued_at']]);
        $waiting_ahead = (int)$ahead_stmt->fetchColumn();

        $ticket['waiting_ahead']          = $waiting_ahead;
        $ticket['estimated_wait_minutes'] = ($waiting_ahead + 1) * AVG_SERVICE_MINUTES;

        json_response(['success' => true, 'ticket' => $ticket]);
    }

    // Service-specific or all-services summary
    $filter_key = !empty($_GET['service']) ? strtolower(trim($_GET['service'])) : null;

    if ($filter_key && !array_key_exists($filter_key, SERVICES)) {
        error_response('Invalid service key');
    }

    $keys = $filter_key ? [$filter_key] : array_keys(SERVICES);

    $pdo     = db();
    $summary = [];

    foreach ($keys as $key) {
        $svc = SERVICES[$key];

        // Aggregate counts by status
        $cnt_stmt = $pdo->prepare(
            'SELECT status, COUNT(*) AS cnt
               FROM Queue_Tickets
              WHERE service_key = :key
                AND DATE(issued_at) = CURDATE()
              GROUP BY status'
        );
        $cnt_stmt->execute([':key' => $key]);
        $counts = array_column($cnt_stmt->fetchAll(), 'cnt', 'status');

        $waiting_count = (int)($counts['waiting']  ?? 0);
        $serving_count = (int)($counts['serving']  ?? 0);
        $served_count  = (int)($counts['served']   ?? 0);
        $missed_count  = (int)($counts['missed']   ?? 0);

        // Currently serving ticket
        $srv_stmt = $pdo->prepare(
            'SELECT id, ticket_number, service_en, service_ms, called_at
               FROM Queue_Tickets
              WHERE service_key = :key AND status = \'serving\'
              ORDER BY called_at DESC
              LIMIT 1'
        );
        $srv_stmt->execute([':key' => $key]);
        $currently_serving = $srv_stmt->fetch() ?: null;

        // Next 5 waiting tickets
        $q_stmt = $pdo->prepare(
            'SELECT id, ticket_number, service_en, service_ms, issued_at
               FROM Queue_Tickets
              WHERE service_key = :key AND status = \'waiting\'
              ORDER BY issued_at ASC
              LIMIT 5'
        );
        $q_stmt->execute([':key' => $key]);
        $queue = $q_stmt->fetchAll();

        $summary[$key] = [
            'service_key'            => $key,
            'service_en'             => $svc['en'],
            'service_ms'             => $svc['ms'],
            'counter_label'          => $svc['counter'],
            'waiting_count'          => $waiting_count,
            'serving_count'          => $serving_count,
            'served_count'           => $served_count,
            'missed_count'           => $missed_count,
            'estimated_wait_minutes' => ($waiting_count + 1) * AVG_SERVICE_MINUTES,
            'currently_serving'      => $currently_serving,
            'queue'                  => $queue,
        ];
    }

    json_response([
        'success'  => true,
        'date'     => date('Y-m-d'),
        'services' => $filter_key ? $summary[$filter_key] : array_values($summary),
    ]);
}
