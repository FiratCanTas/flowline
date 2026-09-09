import { describe, expect, test } from 'vitest';
import { getStageDistribution } from './utils';

describe('getStageDistribution', () => {
  test('Call the function with an empty array', () => {
    expect(getStageDistribution([])).toEqual([
      { stage: 'lead', count: 0 },
      { stage: 'qualified', count: 0 },
      { stage: 'proposal', count: 0 },
      { stage: 'negotiation', count: 0 },
      { stage: 'won', count: 0 },
      { stage: 'lost', count: 0 },
    ]);
  });
  test('Call the function with an undefined value', () => {
    expect(getStageDistribution(undefined)).toEqual([
      { stage: 'lead', count: 0 },
      { stage: 'qualified', count: 0 },
      { stage: 'proposal', count: 0 },
      { stage: 'negotiation', count: 0 },
      { stage: 'won', count: 0 },
      { stage: 'lost', count: 0 },
    ]);
  });
  test('Call the function with 2 lead-staged and 1 won-staged deal values', () => {
    const deals = [
      {
        value: 45000,
        stage: 'lead',
      },
      {
        value: 45000,
        stage: 'lead',
      },
      {
        value: 9800,
        stage: 'won',
      },
    ];
    expect(getStageDistribution(deals)).toEqual([
      { stage: 'lead', count: 2 },
      { stage: 'qualified', count: 0 },
      { stage: 'proposal', count: 0 },
      { stage: 'negotiation', count: 0 },
      { stage: 'won', count: 1 },
      { stage: 'lost', count: 0 },
    ]);
  });
});
