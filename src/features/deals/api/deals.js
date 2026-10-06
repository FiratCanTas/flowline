import { supabase } from '../../../lib/supabase';
import { convertToDatabaseForm, convertToDeal } from './dealMapper';

export const getDeals = async () => {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  const deals = data.map((item) => convertToDeal(item));

  return deals;
};

export const addDeal = async (deal) => {
  const convertedDeal = convertToDatabaseForm(deal);

  const { data, error } = await supabase.from('deals').insert(convertedDeal).select().single();

  if (error) throw new Error(error.message);

  const generatedDeal = convertToDeal(data);

  return generatedDeal;
};

export const updateDeal = async (id, newDealData) => {
  const convertedDeal = convertToDatabaseForm(newDealData);

  const { data, error } = await supabase
    .from('deals')
    .update(convertedDeal)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  const updatedDeal = convertToDeal(data);

  return updatedDeal;
};

export const deleteDeal = async (id) => {
  const { data, error } = await supabase.from('deals').delete().eq('id', id).select().single();

  if (error?.code === '23503') {
    throw new Error(
      "This deal can't be deleted because it still has activities. Delete the activities first.",
    );
  } else if (error) {
    throw new Error("Couldn't delete the deal. Please try again.");
  }

  const deletedDeal = convertToDeal(data);

  return deletedDeal;
};
