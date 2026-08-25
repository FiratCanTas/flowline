import { useQuery } from '@tanstack/react-query';
import { getDeals } from '../features/deals/api/deals';
import { getContacts } from '../features/contacts/api/contacts';
import { Link } from 'react-router';

const Deals = () => {
  const {
    data: deals,
    isLoading: isDealsLoading,
    error: dealsError,
  } = useQuery({
    queryKey: ['deals'],
    queryFn: getDeals,
  });
  const {
    data: contacts,
    isLoading: isContactsLoading,
    error: contactsError,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  if (isDealsLoading || isContactsLoading) {
    return <span>Loading...</span>;
  } else if (dealsError || contactsError) {
    return <span>{dealsError?.message || contactsError?.message}</span>;
  }

  const categorisedDeals = {
    negotiation: deals?.filter((deal) => deal.stage.toLowerCase() === 'negotiation'),
    lead: deals?.filter((deal) => deal.stage.toLowerCase() === 'lead'),
    won: deals?.filter((deal) => deal.stage.toLowerCase() === 'won'),
    lost: deals?.filter((deal) => deal.stage.toLowerCase() === 'lost'),
    qualified: deals?.filter((deal) => deal.stage.toLowerCase() === 'qualified'),
    proposal: deals?.filter((deal) => deal.stage.toLowerCase() === 'proposal'),
  };

  return (
    <div>
      <Link
        className="bg-accent text-accent-foreground hover:bg-accent-hover focus-visible:outline-focus-ring rounded-md px-4 py-2 text-sm outline-offset-2"
        to="./new"
      >
        Add New Deal
      </Link>
      <div className="flex flex-col gap-2 md:flex-row md:overflow-x-auto">
        {Object.keys(categorisedDeals)?.map((dealCategory) => (
          <div key={dealCategory} className="w-full flex-1 md:min-w-52">
            <h3 className="first-letter:uppercase">
              {dealCategory} ({categorisedDeals[`${dealCategory}`].length})
            </h3>

            <div className="">
              {categorisedDeals[`${dealCategory}`].length ? (
                categorisedDeals[`${dealCategory}`].map(({ id, title, value, contactId }) => (
                  <Link key={id} to={`./${id}`}>
                    <div className="border-border my-2 rounded-md border p-1">
                      <p className="line-clamp-1 font-semibold">{title}</p>
                      <p>${value.toLocaleString()}</p>
                      <p>{contacts?.find((contact) => contact.id === contactId)?.name}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="border-border border p-1">No deals</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Deals;
