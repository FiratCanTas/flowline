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

export const updateContact = (id, newContactData) => {
  const updatedContact = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = true;
      if (result) {
        const contactIndex = contacts.findIndex((contact) => contact.id === id);
        contacts[contactIndex] = { ...contacts[contactIndex], ...newContactData };
        resolve(contacts[contactIndex]);
      } else reject('Something went wrong!');
    }, 300);
  });
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
