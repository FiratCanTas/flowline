import { describe, expect, test } from 'vitest';
import { getWeightedPipelineValue, getWeightedValue, isActionlessDeal, isDealStale } from './utils';

describe('getWeightedValue', () => {
  test('applies 50% weight for a proposal-stage deal', () => {
    const deal = { value: 40000, stage: 'proposal' };
    expect(getWeightedValue(deal)).toBe(20000);
  });
  test('applies 10% weight for a lead-stage deal', () => {
    const deal = { value: 40000, stage: 'lead' };
    expect(getWeightedValue(deal)).toBe(4000);
  });
  test('applies 100% weight for a won-stage deal', () => {
    const deal = { value: 40000, stage: 'won' };
    expect(getWeightedValue(deal)).toBe(40000);
  });
});

describe('getWeightedPipelineValue', () => {
  test('total weighted values of open-stage deals only', () => {
    const deals = [
      { value: 10000, stage: 'won' },
      { value: 20000, stage: 'lead' },
      { value: 30000, stage: 'negotiation' },
      { value: 50000, stage: 'proposal' },
    ];
    expect(getWeightedPipelineValue(deals)).toBe(49500);
  });
  test('returns 0 for an empty deals array', () => {
    const deals = [];
    expect(getWeightedPipelineValue(deals)).toBe(0);
  });
});

describe('isDealStale', () => {
  test('returns true when a deal exceeds its stage threshold', () => {
    const today = new Date('2026-08-28');
    const activity = {
      id: '2',
      dealId: '1',
      contactId: '1',
      type: 'task',
      title: 'Send updated MSA draft',
      dueDate: '2026-08-20',
      isCompleted: false,
      createdAt: '2026-07-25T10:00:00.000Z',
    };
    const deal = {
      id: 1,
      stage: 'negotiation',
      createdAt: '2026-07-24',
    };
    expect(isDealStale(deal, [activity], today)).toBe(true);
  });
  test('returns false when a deal is within its stage threshold', () => {
    const today = new Date('2026-08-25');
    const activity = {
      id: '5',
      dealId: '10',
      contactId: '1',
      type: 'task',
      title: 'Follow up call',
      dueDate: '2026-08-30',
      isCompleted: false,
      createdAt: '2026-08-24T10:00:00.000Z',
    };
    const deal = {
      id: '10',
      stage: 'lead',
      createdAt: '2026-08-01',
    };
    expect(isDealStale(deal, [activity], today)).toBe(false);
  });
  test('returns false for won or lost deals regardless of age', () => {
    const today = new Date('2026-08-20');
    const dealWon = {
      stage: 'won',
      createdAt: '2025-08-21',
    };
    const dealLost = {
      stage: 'lost',
      createdAt: '2025-08-21',
    };
    expect(isDealStale(dealWon, [], today)).toBe(false);
    expect(isDealStale(dealLost, [], today)).toBe(false);
  });
});

describe('isActionlessDeal', () => {
  test('With won-staged and lost-staged deal', () => {
    const activities = [
      {
        id: '1',
        dealId: '4',
        contactId: '1',
        type: 'note',
        title: 'Contract redlines requested by legal',
        dueDate: null,
        isCompleted: false,
        createdAt: '2026-08-10T09:00:00.000Z',
      },
      {
        id: '2',
        dealId: '8',
        contactId: '1',
        type: 'task',
        title: 'Send updated MSA draft',
        dueDate: '2026-08-20',
        isCompleted: false,
        createdAt: '2026-08-15T10:00:00.000Z',
      },
    ];
    const dealWon = {
      id: '4',
      stage: 'won',
    };

    const dealLost = {
      id: '8',
      stage: 'lost',
    };
    expect(isActionlessDeal(dealWon, activities)).toBe(false);
    expect(isActionlessDeal(dealLost, activities)).toBe(false);
  });
  test('Any activity of non completed task type deal', () => {
    const activities = [
      {
        id: '3',
        dealId: '2',
        contactId: '2',
        type: 'task',
        title: 'Schedule fleet tracking demo',
        dueDate: '2026-09-10',
        isCompleted: false,
        createdAt: '2026-08-25T14:00:00.000Z',
      },
    ];
    const deal = {
      id: '2',
      stage: 'lead',
    };
    expect(isActionlessDeal(deal, activities)).toBe(false);
  });
  test('When the whole activities related to the deal are either completed or notes', () => {
    const deal = {
      id: '5',
      stage: 'qualified',
    };

    const completedActivities = [
      {
        id: '4',
        dealId: '5',
        contactId: '2',
        type: 'task',
        title: 'Ops team prefers Q4 rollout',
        dueDate: null,
        isCompleted: true,
        createdAt: '2026-08-20T11:00:00.000Z',
      },
      {
        id: '6',
        dealId: '5',
        contactId: '5',
        type: 'task',
        title: 'CTO wants integration with existing stack',
        dueDate: null,
        isCompleted: true,
        createdAt: '2026-07-01T13:00:00.000Z',
      },
    ];
    const noteActivities = [
      {
        id: '4',
        dealId: '5',
        contactId: '2',
        type: 'note',
        title: 'Ops team prefers Q4 rollout',
        dueDate: null,
        isCompleted: false,
        createdAt: '2026-08-20T11:00:00.000Z',
      },
      {
        id: '6',
        dealId: '5',
        contactId: '5',
        type: 'note',
        title: 'CTO wants integration with existing stack',
        dueDate: null,
        isCompleted: false,
        createdAt: '2026-07-01T13:00:00.000Z',
      },
    ];

    expect(isActionlessDeal(deal, completedActivities)).toBe(true);
    expect(isActionlessDeal(deal, noteActivities)).toBe(true);
  });
  test('Activities are either empty array or undefined', () => {
    const deal = {
      id: '1',
      stage: 'lead',
    };
    expect(isActionlessDeal(deal, [])).toBe(true);
    expect(isActionlessDeal(deal, undefined)).toBe(true);
  });
  test('There is no activity related to the deal', () => {
    const deal = {
      id: '3',
      stage: 'qualified',
    };
    const activities = [
      {
        id: '1',
        dealId: '1',
        contactId: '1',
        type: 'note',
        title: 'Contract redlines requested by legal',
        dueDate: null,
        isCompleted: false,
        createdAt: '2026-08-10T09:00:00.000Z',
      },
      {
        id: '2',
        dealId: '1',
        contactId: '1',
        type: 'task',
        title: 'Send updated MSA draft',
        dueDate: '2026-08-20',
        isCompleted: false,
        createdAt: '2026-08-15T10:00:00.000Z',
      },
      {
        id: '3',
        dealId: '2',
        contactId: '2',
        type: 'task',
        title: 'Schedule fleet tracking demo',
        dueDate: '2026-09-10',
        isCompleted: false,
        createdAt: '2026-08-25T14:00:00.000Z',
      },
    ];
    expect(isActionlessDeal(deal, activities)).toBe(true);
  });
});
