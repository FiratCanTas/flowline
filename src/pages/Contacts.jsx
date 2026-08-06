import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../features/contacts/api/contacts';
import { useSearchParams } from 'react-router';

const Contacts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';

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

  const handleSort = (event) => {
    const sortValue = event.target.value;
    setSearchParams(
      (prevParams) => {
        prevParams.set('sort', sortValue);

        return prevParams;
      },
      { replace: true },
    );
  };

  let filteredContacts = data?.length ? [...data] : [];
  if (search?.trim())
    filteredContacts = filteredContacts?.filter(
      (contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.company.toLowerCase().includes(search.toLowerCase()),
    );

  let sortedContacts = filteredContacts?.length ? [...filteredContacts] : [];

  if (sort?.trim()) {
    sortedContacts = sortedContacts?.sort((a, b) => {
      const firstName = a.name.toLowerCase();
      const secondName = b.name.toLowerCase();
      if (sort === 'asc') {
        return firstName.localeCompare(secondName);
      } else if (sort === 'desc') {
        return secondName.localeCompare(firstName);
      }
    });
  }

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <div>
      <input type="text" value={search} onChange={handleSearch} className="border" />
      <select value={sort} onChange={handleSort} name="sort" id="sort">
        <option value="">Please choose an option</option>
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>
      <ul>
        {sortedContacts?.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.company}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Contacts;
