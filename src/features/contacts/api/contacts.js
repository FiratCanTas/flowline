import { supabase } from '../../../lib/supabase';

export const getContacts = async () => {
  const { data: contacts, error } = await supabase.from('contacts').select('*');

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

export const deleteContact = (id) => {
  const deletedContact = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = true;
      if (result) {
        const contactIndex = contacts.findIndex((contact) => contact.id === id);
        const deletedContact = contacts[contactIndex];
        contacts.splice(contactIndex, 1);
        resolve(deletedContact);
      } else {
        reject('Something went wrong!');
      }
    }, 300);
  });

  return deletedContact;
};
