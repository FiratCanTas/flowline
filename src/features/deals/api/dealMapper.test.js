import { describe, expect, test } from 'vitest';
import { convertToDatabaseForm, convertToDeal } from './dealMapper';

describe('convertToDeal', () => {
  test('converts snake_case database fields to camelCase', () => {
    const row = {
      id: 'deal-1',
      title: 'Website redesign',
      value: 5000,
      stage: 'lead',
      created_at: '2026-09-01T10:00:00Z',
      contact_id: 'contact-1',
    };

    expect(convertToDeal(row)).toEqual({
      id: 'deal-1',
      title: 'Website redesign',
      value: 5000,
      stage: 'lead',
      createdAt: '2026-09-01T10:00:00Z',
      contactId: 'contact-1',
    });
  });
});

describe('convertToDatabaseForm', () => {
  test('converts camelCase fields to snake_case database form', () => {
    const deal = {
      id: 'deal-1',
      title: 'Website redesign',
      value: 5000,
      stage: 'lead',
      createdAt: '2026-09-01T10:00:00Z',
      contactId: 'contact-1',
    };

    expect(convertToDatabaseForm(deal)).toEqual({
      id: 'deal-1',
      title: 'Website redesign',
      value: 5000,
      stage: 'lead',
      created_at: '2026-09-01T10:00:00Z',
      contact_id: 'contact-1',
    });
  });
});
