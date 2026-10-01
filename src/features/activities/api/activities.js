import { supabase } from '../../../lib/supabase';
import { convertToActivity, convertToDatabaseForm } from './activityMapper';

export const getActivities = async () => {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  const activities = data.map((item) => convertToActivity(item));

  return activities;
};

export const addActivity = async (activity) => {
  const convertedActivity = convertToDatabaseForm(activity);

  const { data, error } = await supabase
    .from('activities')
    .insert(convertedActivity)
    .select()
    .single();

  if (error) throw new Error(error.message);

  const addedActivity = convertToActivity(data);

  return addedActivity;
};

export const updateActivity = async (id, newActivityData) => {
  const convertedActivity = convertToDatabaseForm(newActivityData);

  const { data, error } = await supabase
    .from('activities')
    .update(convertedActivity)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  const updatedActivity = convertToActivity(data);

  return updatedActivity;
};

export const deleteActivity = async (id) => {
  const { data, error } = await supabase.from('activities').delete().eq('id', id).select().single();

  if (error) throw new Error(error.message);

  const deletedActivity = convertToActivity(data);

  return deletedActivity;
};
