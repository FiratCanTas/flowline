import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../features/contacts/api/contacts';
import { useState } from 'react';

const Contacts = () => {
  const [search, setSearch] = useState('');

  const { isLoading, error, data } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>{error.message}</span>;
  }

  const handleSearch = (event) => {
    const text = event.target.value;
    setSearch(text);
  };

  const filteredContacts = data?.filter(
    (contact) =>
      !search.trim() ||
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.company.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <input type="text" value={search} onChange={handleSearch} className="border" />
      <ul>
        {filteredContacts?.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.company}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Contacts;
