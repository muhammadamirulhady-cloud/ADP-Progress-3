import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type ServiceKey = 'licensing' | 'assessment' | 'engineering' | 'health' | 'general';

export interface ServiceInfo {
  key: ServiceKey;
  en: string;
  ms: string;
  prefix: string;
  counterLabel: string;
}

export const SERVICES: ServiceInfo[] = [
  { key: 'licensing',   en: 'Licensing',              ms: 'Pelesenan',              prefix: 'A', counterLabel: 'Counter 1' },
  { key: 'assessment',  en: 'Assessment & Tax',        ms: 'Taksiran & Cukai',       prefix: 'B', counterLabel: 'Counter 2' },
  { key: 'engineering', en: 'Engineering',             ms: 'Kejuruteraan',           prefix: 'C', counterLabel: 'Counter 3' },
  { key: 'health',      en: 'Health & Environment',    ms: 'Kesihatan & Alam Sekitar', prefix: 'D', counterLabel: 'Counter 4' },
  { key: 'general',     en: 'General Inquiries',       ms: 'Pertanyaan Am',          prefix: 'E', counterLabel: 'Counter 5' },
];

export type TicketStatus = 'waiting' | 'serving' | 'served' | 'missed' | 'no-show';

export interface QueueTicket {
  id: string;
  number: string;           // e.g. "A043"
  serviceKey: ServiceKey;
  issuedAt: number;         // timestamp ms
  calledAt?: number;
  closedAt?: number;
  status: TicketStatus;
  estimatedWaitMinutes: number;
}

interface ServiceCounters {
  [key: string]: number;    // serviceKey → next sequence number
}

interface QueueState {
  tickets: QueueTicket[];
  serviceCounters: ServiceCounters;
}

function loadState(): QueueState {
  try {
    const raw = localStorage.getItem('aifrontdesk_queue');
    if (raw) return JSON.parse(raw) as QueueState;
  } catch { /* ignore */ }
  return { tickets: [], serviceCounters: {} };
}

function saveState(state: QueueState) {
  try {
    localStorage.setItem('aifrontdesk_queue', JSON.stringify(state));
  } catch { /* ignore */ }
}

// Average service time per ticket in minutes (used for wait estimation)
const AVG_SERVICE_MINUTES = 5;

interface QueueContextValue {
  tickets: QueueTicket[];

  // Citizen actions
  issueTicket: (serviceKey: ServiceKey) => QueueTicket;

  // Staff actions
  callNext: (serviceKey: ServiceKey) => QueueTicket | null;
  markServed: (ticketId: string) => void;
  markMissed: (ticketId: string) => void;
  callSpecific: (ticketId: string) => void;

  // Queries
  getWaiting: (serviceKey: ServiceKey) => QueueTicket[];
  getCurrentlyServing: (serviceKey: ServiceKey) => QueueTicket | null;
  estimateWait: (serviceKey: ServiceKey) => number;

  // All-service queue for queue manager
  allWaiting: QueueTicket[];
  currentlyServing: QueueTicket[];

  // Reset (end of day)
  resetQueue: () => void;
}

const QueueContext = createContext<QueueContextValue | null>(null);

export function QueueProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QueueState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const issueTicket = useCallback((serviceKey: ServiceKey): QueueTicket => {
    const service = SERVICES.find(s => s.key === serviceKey)!;
    let ticket!: QueueTicket;

    setState(prev => {
      const seq = (prev.serviceCounters[serviceKey] ?? 0) + 1;
      const number = `${service.prefix}${String(seq).padStart(3, '0')}`;
      const waitingCount = prev.tickets.filter(
        t => t.serviceKey === serviceKey && t.status === 'waiting'
      ).length;
      const newTicket: QueueTicket = {
        id: `${serviceKey}-${Date.now()}`,
        number,
        serviceKey,
        issuedAt: Date.now(),
        status: 'waiting',
        estimatedWaitMinutes: waitingCount * AVG_SERVICE_MINUTES + AVG_SERVICE_MINUTES,
      };
      ticket = newTicket;
      return {
        tickets: [...prev.tickets, newTicket],
        serviceCounters: { ...prev.serviceCounters, [serviceKey]: seq },
      };
    });

    return ticket;
  }, []);

  const callNext = useCallback((serviceKey: ServiceKey): QueueTicket | null => {
    let called: QueueTicket | null = null;

    setState(prev => {
      // Dismiss any currently serving ticket for this service
      const updated = prev.tickets.map(t => {
        if (t.serviceKey === serviceKey && t.status === 'serving') {
          return { ...t, status: 'served' as TicketStatus, closedAt: Date.now() };
        }
        return t;
      });

      const nextWaiting = updated
        .filter(t => t.serviceKey === serviceKey && t.status === 'waiting')
        .sort((a, b) => a.issuedAt - b.issuedAt)[0];

      if (!nextWaiting) return { ...prev, tickets: updated };

      called = { ...nextWaiting, status: 'serving', calledAt: Date.now() };
      return {
        ...prev,
        tickets: updated.map(t => (t.id === nextWaiting.id ? called! : t)),
      };
    });

    return called;
  }, []);

  const callSpecific = useCallback((ticketId: string) => {
    setState(prev => {
      const target = prev.tickets.find(t => t.id === ticketId);
      if (!target || target.status !== 'waiting') return prev;

      // Dismiss any currently serving ticket for the same service
      const updated = prev.tickets.map(t => {
        if (t.serviceKey === target.serviceKey && t.status === 'serving') {
          return { ...t, status: 'served' as TicketStatus, closedAt: Date.now() };
        }
        return t;
      });

      return {
        ...prev,
        tickets: updated.map(t =>
          t.id === ticketId ? { ...t, status: 'serving' as TicketStatus, calledAt: Date.now() } : t
        ),
      };
    });
  }, []);

  const markServed = useCallback((ticketId: string) => {
    setState(prev => ({
      ...prev,
      tickets: prev.tickets.map(t =>
        t.id === ticketId ? { ...t, status: 'served' as TicketStatus, closedAt: Date.now() } : t
      ),
    }));
  }, []);

  const markMissed = useCallback((ticketId: string) => {
    setState(prev => ({
      ...prev,
      tickets: prev.tickets.map(t =>
        t.id === ticketId ? { ...t, status: 'missed' as TicketStatus, closedAt: Date.now() } : t
      ),
    }));
  }, []);

  const getWaiting = useCallback(
    (serviceKey: ServiceKey) =>
      state.tickets
        .filter(t => t.serviceKey === serviceKey && t.status === 'waiting')
        .sort((a, b) => a.issuedAt - b.issuedAt),
    [state.tickets]
  );

  const getCurrentlyServing = useCallback(
    (serviceKey: ServiceKey) =>
      state.tickets.find(t => t.serviceKey === serviceKey && t.status === 'serving') ?? null,
    [state.tickets]
  );

  const estimateWait = useCallback(
    (serviceKey: ServiceKey) => {
      const waitingCount = state.tickets.filter(
        t => t.serviceKey === serviceKey && t.status === 'waiting'
      ).length;
      return waitingCount * AVG_SERVICE_MINUTES + AVG_SERVICE_MINUTES;
    },
    [state.tickets]
  );

  const allWaiting = state.tickets
    .filter(t => t.status === 'waiting')
    .sort((a, b) => a.issuedAt - b.issuedAt);

  const currentlyServing = state.tickets.filter(t => t.status === 'serving');

  const resetQueue = useCallback(() => {
    const cleared: QueueState = { tickets: [], serviceCounters: {} };
    setState(cleared);
    saveState(cleared);
  }, []);

  return (
    <QueueContext.Provider
      value={{
        tickets: state.tickets,
        issueTicket,
        callNext,
        markServed,
        markMissed,
        callSpecific,
        getWaiting,
        getCurrentlyServing,
        estimateWait,
        allWaiting,
        currentlyServing,
        resetQueue,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const ctx = useContext(QueueContext);
  if (!ctx) throw new Error('useQueue must be used within QueueProvider');
  return ctx;
}
