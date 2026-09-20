import { supabase } from '../../../lib/supabase';

const convertToDeal = (data) => {
  const { id, title, value, stage, created_at, contact_id } = data;

  return {
    id,
    title,
    value,
    stage,
    createdAt: created_at,
    contactId: contact_id,
  };
};
const convertToDatabaseForm = (deal) => {
  const { id, title, value, stage, createdAt, contactId } = deal;

  return {
    id,
    title,
    value,
    stage,
    created_at: createdAt,
    contact_id: contactId,
  };
};

export const getDeals = async () => {
  const { data, error } = await supabase.from('deals').select('*');

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
