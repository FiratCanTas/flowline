import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../features/contacts/api/contacts';
import { Link, useSearchParams } from 'react-router';

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

  let emptyMessage = null;
  if (!data?.length) emptyMessage = 'There is no contact data yet.';
  else if (search && !paginatedContacts?.length)
    emptyMessage = `No results found matching "${search}"`;

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <div>
      <div className="flex justify-between">
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
        </div>

        <Link
          className="bg-accent text-accent-foreground hover:bg-accent-hover focus-visible:outline-focus-ring rounded-md px-4 py-2 text-sm outline-offset-2"
          to="./new"
        >
          Add New Contact
        </Link>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {emptyMessage ? (
          <p>{emptyMessage}</p>
        ) : (
          paginatedContacts?.map(({ id, name, company, position, email }) => (
            <div key={id} className="border-border bg-surface-1 space-y-1 rounded-md border p-4">
              <Link
                to={`./${id}`}
                className="text-text hover:bg-surface-2 hover:text-text rounded-md text-base font-semibold"
              >
                {name}
              </Link>

              <p className="text-text-muted text-sm">
                {company} · {position}
              </p>
              <p className="text-text-muted text-xs">{email}</p>
            </div>
          ))
        )}
      </div>

      <table className="hidden md:table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Company</th>
            <th scope="col">Position</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {emptyMessage ? (
            <tr>
              <td colSpan={4}>{emptyMessage}</td>
            </tr>
          ) : (
            paginatedContacts?.map(({ id, name, company, position, email }) => (
              <tr key={id}>
                <td>
                  <Link to={`./${id}`} className="hover:bg-surface-2 hover:text-text rounded-md">
                    {name}
                  </Link>
                </td>
                <td>{company}</td>
                <td>{position}</td>
                <td>{email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

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
