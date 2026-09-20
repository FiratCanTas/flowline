import { supabase } from '../../../lib/supabase';

const convertToActivity = (data) => {
  const { id, title, type, is_completed, due_date, deal_id, created_at, contact_id } = data;

  return {
    id,
    dealId: deal_id,
    contactId: contact_id,
    type,
    title,
    dueDate: due_date,
    isCompleted: is_completed,
    createdAt: created_at,
  };
};
const convertToDatabaseForm = (activity) => {
  const { id, dealId, contactId, type, title, dueDate, isCompleted, createdAt } = activity;

  return {
    id,
    deal_id: dealId,
    contact_id: contactId,
    type,
    title,
    due_date: dueDate,
    is_completed: isCompleted,
    created_at: createdAt,
  };
};

export const getActivities = async () => {
  const { data, error } = await supabase.from('activities').select('*');

  if (error) throw new Error(error.message);

  const activities = data.map((item) => convertToActivity(item));

  return activities;
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
