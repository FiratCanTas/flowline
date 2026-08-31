import { describe, expect, test } from 'vitest';
import { getWeightedPipelineValue, getWeightedValue, isDealStale } from './utils';

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
    const deal = {
      stage: 'negotiation',
      createdAt: '2026-07-24',
    };
    expect(isDealStale(deal, today)).toBe(true);
  });
  test('returns false when a deal is within its stage threshold', () => {
    const today = new Date('2026-08-25');
    const deal = {
      stage: 'lead',
      createdAt: '2026-08-24',
    };
    expect(isDealStale(deal, today)).toBe(false);
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
    expect(isDealStale(dealWon, today)).toBe(false);
    expect(isDealStale(dealLost, today)).toBe(false);
  });
});
