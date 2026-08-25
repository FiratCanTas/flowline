export const deals = [
  {
    id: '1',
    title: 'BrightGears - Q3 Renewal',
    contactId: '1',
    value: 24000,
    stage: 'negotiation',
    createdAt: '2026-06-02T10:15:00.000Z',
  },
  {
    id: '2',
    title: 'NorthPeak Logistics - Fleet Tracking Rollout',
    contactId: '2',
    value: 58000,
    stage: 'proposal',
    createdAt: '2026-05-14T09:00:00.000Z',
  },
  {
    id: '3',
    title: 'Delgado & Ruiz - Brand Refresh Package',
    contactId: '3',
    value: 12500,
    stage: 'lead',
    createdAt: '2026-07-20T13:40:00.000Z',
  },
  {
    id: '4',
    title: 'Nowak Industrial - Plant Automation Phase 1',
    contactId: '4',
    value: 87000,
    stage: 'won',
    createdAt: '2026-01-11T08:30:00.000Z',
  },
  {
    id: '5',
    title: 'Patel Digital - CTO Tooling Upgrade',
    contactId: '5',
    value: 15000,
    stage: 'qualified',
    createdAt: '2026-06-28T11:05:00.000Z',
  },
  {
    id: '6',
    title: 'Berg Renewables - Sustainability Dashboard',
    contactId: '6',
    value: 32000,
    stage: 'proposal',
    createdAt: '2026-04-09T14:20:00.000Z',
  },
  {
    id: '7',
    title: 'Anka Trade Group - Export Pipeline Expansion',
    contactId: '7',
    value: 45000,
    stage: 'negotiation',
    createdAt: '2026-07-02T09:50:00.000Z',
  },
  {
    id: '8',
    title: "O'Connor Manufacturing - Ops Efficiency Audit",
    contactId: '8',
    value: 9800,
    stage: 'lost',
    createdAt: '2025-12-15T10:00:00.000Z',
  },
  {
    id: '9',
    title: 'Petrov Analytics - Data Platform Migration',
    contactId: '9',
    value: 63000,
    stage: 'lead',
    createdAt: '2026-08-05T16:10:00.000Z',
  },
  {
    id: '10',
    title: 'Fischer Automation - Robotics Line Contract',
    contactId: '10',
    value: 120000,
    stage: 'qualified',
    createdAt: '2026-03-22T12:00:00.000Z',
  },
];

export const getDeals = () => {
  const dealList = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = true;
      if (result) {
        resolve(deals);
      } else {
        reject('Something went wrong!');
      }
    }, 300);
  });
  return dealList;
};

export const addDeal = (deal) => {
  const generateId = crypto.randomUUID();
  const addedDeal = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = true;
      if (result) {
        const newDeal = { ...deal, id: generateId };
        deals.push(newDeal);
        resolve(newDeal);
      } else {
        reject('Something went wrong!');
      }
    }, 300);
  });
  return addedDeal;
};

export const updateDeal = (id, newDealData) => {
  const updatedDeal = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = true;
      if (result) {
        const dealIndex = deals.findIndex((deal) => deal.id === id);
        deals[dealIndex] = { ...deals[dealIndex], ...newDealData };
        resolve(deals[dealIndex]);
      } else {
        reject('Something went wrong!');
      }
    }, 300);
  });
  return updatedDeal;
};

export const deleteDeal = (id) => {
  const deletedDeal = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = true;
      if (result) {
        const dealIndex = deals.findIndex((deal) => deal.id === id);
        const deletedDeal = deals[dealIndex];
        deals.splice(dealIndex, 1);
        resolve(deletedDeal);
      } else {
        reject('Something went wrong!');
      }
    }, 300);
  });
  return deletedDeal;
};
