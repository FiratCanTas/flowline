import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../features/contacts/api/contacts';

const Contacts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <ul>
      {data?.map((contact) => (
        <li key={contact.id}>{contact.name}</li>
      ))}
    </ul>
  );
};
export default Contacts;
