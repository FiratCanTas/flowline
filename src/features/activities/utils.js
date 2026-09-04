import { isBefore, startOfDay } from 'date-fns';

export const isTaskOverdue = (activity, today = new Date()) => {
  if (activity.type !== 'task' || activity.isCompleted || !activity.dueDate) return false;

  const result = isBefore(startOfDay(activity.dueDate), startOfDay(today));
  if (result) return true;
  else return false;
};
