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
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageSize = 5;

  const handleSearchAndSort = (event) => {
    const { name, value } = event.target;
    setSearchParams(
      (prevParams) => {
        prevParams.set(name, value);
        prevParams.delete('page');
        return prevParams;
      },
      { replace: true },
    );
  };

  const handlePagination = (event) => {
    const { name } = event.target;
    let newPage;

    if (name === 'prev') {
      newPage = currentPage - 1;
    } else {
      newPage = currentPage + 1;
    }

    setSearchParams(
      (prevParams) => {
        prevParams.set('page', newPage);

        return prevParams;
      },
      { replace: true },
    );
  };

  let filteredContacts = data?.length ? [...data] : [];
  if (search?.trim()) {
    filteredContacts = filteredContacts?.filter(
      (contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.company.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const totalPageNumber = Math.ceil(filteredContacts?.length / pageSize);

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

  let paginatedContacts = sortedContacts?.length ? [...sortedContacts] : [];

  paginatedContacts = paginatedContacts.slice(
    pageSize * currentPage - pageSize,
    pageSize * currentPage,
  );

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <div>
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleSearchAndSort}
        className="border"
      />
      <select value={sort} onChange={handleSearchAndSort} name="sort" id="sort">
        <option value="">Please choose an option</option>
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>
      <ul>
        {paginatedContacts?.map((contact) => (
          <li key={contact.id}>
            {contact.name} - {contact.company}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePagination} name="prev" type="button" disabled={currentPage === 1}>
          Prev
        </button>
        <span>{currentPage}</span>
        <button
          onClick={handlePagination}
          name="next"
          type="button"
          disabled={currentPage === totalPageNumber || totalPageNumber === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Contacts;
