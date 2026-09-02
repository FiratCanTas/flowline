export const activities = [
  {
    id: '1',
    dealId: '1',
    contactId: '1',
    type: 'note',
    title: 'Contract redlines requested by legal',
    dueDate: null,
    isCompleted: true,
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
  {
    id: '4',
    dealId: '2',
    contactId: '2',
    type: 'note',
    title: 'Ops team prefers Q4 rollout',
    dueDate: null,
    isCompleted: true,
    createdAt: '2026-08-20T11:00:00.000Z',
  },
  {
    id: '5',
    dealId: '3',
    contactId: '3',
    type: 'task',
    title: 'Follow up on brand refresh proposal',
    dueDate: '2026-08-01',
    isCompleted: false,
    createdAt: '2026-07-22T09:30:00.000Z',
  },
  {
    id: '6',
    dealId: '5',
    contactId: '5',
    type: 'note',
    title: 'CTO wants integration with existing stack',
    dueDate: null,
    isCompleted: true,
    createdAt: '2026-07-01T13:00:00.000Z',
  },
  {
    id: '7',
    dealId: '6',
    contactId: '6',
    type: 'task',
    title: 'Prepare sustainability dashboard mockups',
    dueDate: '2026-08-15',
    isCompleted: true,
    createdAt: '2026-08-05T10:00:00.000Z',
  },
  {
    id: '8',
    dealId: '7',
    contactId: '7',
    type: 'task',
    title: 'Confirm final contract terms',
    dueDate: '2026-09-05',
    isCompleted: false,
    createdAt: '2026-08-28T16:00:00.000Z',
  },
  {
    id: '9',
    dealId: '9',
    contactId: '9',
    type: 'note',
    title: 'Initial discovery call notes',
    dueDate: null,
    isCompleted: true,
    createdAt: '2026-08-05T12:00:00.000Z',
  },
  {
    id: '10',
    dealId: '10',
    contactId: '10',
    type: 'task',
    title: 'Send robotics line technical spec',
    dueDate: '2026-07-30',
    isCompleted: false,
    createdAt: '2026-07-25T09:00:00.000Z',
  },
];

export const getActivities = () => {
  const activityList = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = true;
      if (result) {
        resolve(activities);
      } else {
        reject('Something went wrong!');
      }
    }, 300);
  });
  return activityList;
};

export const addActivity = (activity) => {
  const activityId = crypto.randomUUID();
  const addedActivity = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = true;
      if (result) {
        const newActivity = { ...activity, id: activityId };
        activities.push(newActivity);
        resolve(newActivity);
      } else {
        reject('Something went wrong!');
      }
    }, 300);
  });
  return addedActivity;
};

export const updateActivity = (id, newActivityData) => {
  const updatedActivity = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = true;
      if (result) {
        const activityIndex = activities.findIndex((activity) => activity.id === id);
        activities[activityIndex] = { ...activities[activityIndex], ...newActivityData };
        resolve(activities[activityIndex]);
      } else {
        reject('Something went wrong!');
      }
    }, 300);
  });
  return updatedActivity;
};

export const deleteActivity = (id) => {
  const deletedActivity = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = true;
      if (result) {
        const activityIndex = activities.findIndex((activity) => activity.id === id);
        const removedActivity = activities[activityIndex];
        activities.splice(activityIndex, 1);
        resolve(removedActivity);
      } else {
        reject('Something went wrong!');
      }
    }, 300);
  });
  return deletedActivity;
};
