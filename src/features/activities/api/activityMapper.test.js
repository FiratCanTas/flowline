import { describe, expect, test } from 'vitest';
import { convertToActivity, convertToDatabaseForm } from './activityMapper';

describe('convertToActivity', () => {
  test('converts snake_case database fields to camelCase', () => {
    const row = {
      id: 'activity-1',
      deal_id: 'deal-1',
      contact_id: 'contact-1',
      type: 'call',
      title: 'Follow-up call',
      due_date: '2026-09-10',
      is_completed: false,
      created_at: '2026-09-01T10:00:00Z',
    };

    expect(convertToActivity(row)).toEqual({
      id: 'activity-1',
      dealId: 'deal-1',
      contactId: 'contact-1',
      type: 'call',
      title: 'Follow-up call',
      dueDate: '2026-09-10',
      isCompleted: false,
      createdAt: '2026-09-01T10:00:00Z',
    });
  });
});

describe('convertToDatabaseForm', () => {
  test('converts camelCase fields to snake_case', () => {
    const activity = {
      id: 'activity-1',
      dealId: 'deal-1',
      contactId: 'contact-1',
      type: 'call',
      title: 'Follow-up call',
      dueDate: '2026-09-10',
      isCompleted: false,
      createdAt: '2026-09-01T10:00:00Z',
    };

    expect(convertToDatabaseForm(activity)).toEqual({
      id: 'activity-1',
      deal_id: 'deal-1',
      contact_id: 'contact-1',
      type: 'call',
      title: 'Follow-up call',
      due_date: '2026-09-10',
      is_completed: false,
      created_at: '2026-09-01T10:00:00Z',
    });
  });
});
