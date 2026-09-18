import { supabase } from '../../../lib/supabase';

export const getContacts = async () => {
  const { data: contacts, error } = await supabase.from('contacts').select('*');

  if (error) throw new Error(error.message);

  return contacts;
};

export const addContact = (contact) => {
  const generateId = crypto.randomUUID();
  const generatedContact = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = true;
      if (result) {
        const newContact = { ...contact, id: generateId };
        contacts.push(newContact);
        resolve(newContact);
      } else {
        reject('Something went wrong!');
      }
    }, 300);
  });
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
