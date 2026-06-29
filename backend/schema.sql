-- ============================================================
--  AI-FrontDesk MPS  –  Queue Ticketing Schema
--  Run once against your MySQL / MariaDB database
-- ============================================================

CREATE DATABASE IF NOT EXISTS aifrontdesk
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE aifrontdesk;

-- ------------------------------------------------------------
--  Queue_Tickets
--  One row per ticket issued by the kiosk.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Queue_Tickets (
  id            INT UNSIGNED    NOT NULL AUTO_INCREMENT,

  -- Human-readable ticket number shown on screen, e.g. "A043"
  ticket_number VARCHAR(10)     NOT NULL,

  -- Which service counter the citizen chose
  service_key   ENUM(
    'licensing',
    'assessment',
    'engineering',
    'health',
    'general'
  )                             NOT NULL,

  -- English / Malay labels (denormalised for easy display)
  service_en    VARCHAR(80)     NOT NULL,
  service_ms    VARCHAR(80)     NOT NULL,

  -- Lifecycle status
  status        ENUM(
    'waiting',   -- ticket issued, citizen waiting
    'serving',   -- staff called this number
    'served',    -- successfully completed
    'missed',    -- called but citizen did not show
    'cancelled'  -- citizen cancelled before being called
  )                             NOT NULL DEFAULT 'waiting',

  -- Timestamps
  issued_at     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  called_at     DATETIME            NULL DEFAULT NULL,
  closed_at     DATETIME            NULL DEFAULT NULL,

  -- Optional: which counter / staff handled the ticket
  counter_label VARCHAR(40)         NULL DEFAULT NULL,
  staff_name    VARCHAR(100)        NULL DEFAULT NULL,

  PRIMARY KEY (id),
  INDEX idx_service_status (service_key, status),
  INDEX idx_issued_at       (issued_at),
  INDEX idx_ticket_number   (ticket_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Sequence helper – tracks the last-issued number per service
--  so ticket numbers never reset within a day on restart.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Queue_Sequences (
  service_key   ENUM(
    'licensing',
    'assessment',
    'engineering',
    'health',
    'general'
  )                             NOT NULL,
  last_seq      SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  reset_date    DATE            NOT NULL DEFAULT (CURDATE()),

  PRIMARY KEY (service_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed one row per service (safe to re-run)
INSERT IGNORE INTO Queue_Sequences (service_key, last_seq, reset_date)
VALUES
  ('licensing',   0, CURDATE()),
  ('assessment',  0, CURDATE()),
  ('engineering', 0, CURDATE()),
  ('health',      0, CURDATE()),
  ('general',     0, CURDATE());
