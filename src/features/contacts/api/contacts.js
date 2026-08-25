export const contacts = [
  {
    id: '1',
    name: 'Elena Kowalski',
    email: 'elena.kowalski@brightgears.com',
    phone: '+48 512 340 221',
    company: 'BrightGears Sp. z o.o.',
    position: 'Head of Procurement',
    createdAt: '2026-02-14T09:30:00.000Z',
  },
  {
    id: '2',
    name: 'Marcus Chen',
    email: 'marcus.chen@northpeaklogistics.com',
    phone: '+48 601 118 774',
    company: 'NorthPeak Logistics',
    position: 'VP of Operations',
    createdAt: '2025-11-02T14:05:00.000Z',
  },
  {
    id: '3',
    name: 'Sofia Delgado',
    email: 'sofia.delgado@delgadoruiz.com',
    phone: '+48 730 552 890',
    company: 'Delgado & Ruiz Consulting',
    position: 'Marketing Director',
    createdAt: '2026-04-21T08:12:00.000Z',
  },
  {
    id: '4',
    name: 'Tomasz Nowak',
    email: 'tomasz.nowak@nowakindustrial.pl',
    phone: '+48 512 903 441',
    company: 'Nowak Industrial',
    position: 'Plant Manager',
    createdAt: '2025-09-18T11:47:00.000Z',
  },
  {
    id: '5',
    name: 'Priya Patel',
    email: 'priya.patel@pateldigital.io',
    phone: '+48 660 224 118',
    company: 'Patel Digital Solutions',
    position: 'CTO',
    createdAt: '2026-05-30T16:20:00.000Z',
  },
  {
    id: '6',
    name: 'Jonas Berg',
    email: 'jonas.berg@bergrenewables.com',
    phone: '+48 502 778 903',
    company: 'Berg Renewables',
    position: 'Sustainability Lead',
    createdAt: '2026-01-09T10:00:00.000Z',
  },
  {
    id: '7',
    name: 'Aylin Demir',
    email: 'aylin.demir@ankatradegroup.com',
    phone: '+48 792 340 665',
    company: 'Anka Trade Group',
    position: 'Sales Director',
    createdAt: '2026-06-11T13:35:00.000Z',
  },
  {
    id: '8',
    name: "Liam O'Connor",
    email: 'liam.oconnor@oconnormfg.com',
    phone: '+48 511 887 302',
    company: "O'Connor Manufacturing",
    position: 'Operations Manager',
    createdAt: '2025-12-27T09:52:00.000Z',
  },
  {
    id: '9',
    name: 'Nadia Petrov',
    email: 'nadia.petrov@petrovanalytics.com',
    phone: '+48 665 419 220',
    company: 'Petrov Analytics',
    position: 'Data Analytics Lead',
    createdAt: '2026-07-03T15:40:00.000Z',
  },
  {
    id: '10',
    name: 'Hugo Fischer',
    email: 'hugo.fischer@fischerautomation.de',
    phone: '+48 733 561 097',
    company: 'Fischer Automation',
    position: 'Automation Engineer',
    createdAt: '2026-03-15T12:18:00.000Z',
  },
];
export const getContacts = () => {
  const contactList = new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = true;
      if (result) {
        resolve(contacts);
      } else {
        reject('Something went wrong!');
      }
    }, 300);
  });

  return contactList;
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
