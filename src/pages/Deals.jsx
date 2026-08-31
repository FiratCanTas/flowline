import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDeals, updateDeal } from '../features/deals/api/deals';
import { getContacts } from '../features/contacts/api/contacts';
import { Link } from 'react-router';
import { getWeightedPipelineValue, isDealStale } from '../features/deals/utils';
import Badge from '../components/ui/Badge';

const Deals = () => {
  const queryClient = useQueryClient();
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

  const { isLoading, mutate } = useMutation({
    mutationKey: ['update deal'],
    mutationFn: (data) => {
      const { id, updatedDeal } = data;
      return updateDeal(id, updatedDeal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
    },
  });

  const handleSelect = (event, id) => {
    const { value, name } = event.target;
    const deal = deals.find((deal) => deal.id === id);
    const updatedDeal = { ...deal, [name]: value };
    mutate({ id, updatedDeal });
  };

  if (isDealsLoading || isContactsLoading) {
    return <span>Loading...</span>;
  } else if (dealsError || contactsError) {
    return <span>{dealsError?.message || contactsError?.message}</span>;
  }

  const categorisedDeals = deals?.reduce(
    (stageGroups, deal) => {
      const stage = deal.stage.toLowerCase();
      stageGroups[stage] = [...stageGroups[stage], deal];
      return stageGroups;
    },
    { negotiation: [], lead: [], won: [], lost: [], qualified: [], proposal: [] },
  );

  return (
    <div>
      <div className="flex justify-between">
        <Link
          className="bg-accent text-accent-foreground hover:bg-accent-hover focus-visible:outline-focus-ring rounded-md px-4 py-2 text-sm outline-offset-2"
          to="./new"
        >
          Add New Deal
        </Link>
        <p>Weighted pipeline: ${getWeightedPipelineValue(deals).toLocaleString()}</p>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:overflow-x-auto">
        {Object.keys(categorisedDeals)?.map((dealCategory) => (
          <div key={dealCategory} className="w-full flex-1 md:min-w-52">
            <h3 className="first-letter:uppercase">
              {dealCategory} ({categorisedDeals[`${dealCategory}`].length})
            </h3>

            {categorisedDeals[`${dealCategory}`].length ? (
              categorisedDeals[`${dealCategory}`].map(
                ({ id, title, stage, createdAt, value, contactId }) => (
                  <div key={id} className="border-border my-2 rounded-md border p-1">
                    <div className="flex">
                      <label htmlFor={id}>Stage:</label>
                      <select
                        id={id}
                        name="stage"
                        value={dealCategory}
                        onChange={(event) => handleSelect(event, id)}
                        className="w-full"
                        disabled={isLoading}
                      >
                        {Object.keys(categorisedDeals)?.map((filteredCategory) => (
                          <option key={filteredCategory} value={filteredCategory}>
                            {filteredCategory}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Link to={`./${id}`}>
                      {isDealStale({ stage, createdAt }) && <Badge variant="danger">Stale</Badge>}
                      <p className="line-clamp-1 font-semibold">{title}</p>
                      <p>${value.toLocaleString()}</p>
                      <p>{contacts?.find((contact) => contact.id === contactId)?.name}</p>
                    </Link>
                  </div>
                ),
              )
            ) : (
              <div className="border-border border p-1">No deals</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Deals;
