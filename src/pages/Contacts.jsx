import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../features/contacts/api/contacts';
import { useSearchParams } from 'react-router';

const Contacts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>{error.message}</span>;
  }

  const search = searchParams.get('search') || '';

  const handleSearch = (event) => {
    const text = event.target.value;
    setSearchParams(
      (prevParams) => {
        prevParams.set('search', text);

        return prevParams;
      },
      { replace: true },
    );
  };

  const filteredContacts = data?.filter(
    (contact) =>
      !search?.trim() ||
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
