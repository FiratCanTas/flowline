import { supabase } from '../../../lib/supabase';

export const getContacts = async () => {
  const { data: contacts, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })
    .order('id', { ascending: false });

  if (error) throw new Error(error.message);

  return contacts;
};

export const addContact = async (contact) => {
  const { data: generatedContact, error } = await supabase
    .from('contacts')
    .insert(contact)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return generatedContact;
};

export const updateContact = async (id, newContactData) => {
  const { data: updatedContact, error } = await supabase
    .from('contacts')
    .update(newContactData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return updatedContact;
};

export const deleteContact = async (id) => {
  const { data: deletedContact, error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error?.code === '23503') {
    throw new Error(
      "This contact can't be deleted because it still has deals or activities. Delete them first.",
    );
  } else if (error) {
    throw new Error("Couldn't delete the contact. Please try again.");
  }

  return deletedContact;
};
