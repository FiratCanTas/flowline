import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import { getContacts } from '../features/contacts/api/contacts';

const ContactDetail = () => {
  const { id: contactId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  const contact = data?.find((contact) => contact.id === contactId);

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>{error.message}</span>;
  } else if (!contact) return <p>The contact has not found.</p>;

  const { name, company, position, email, phone } = contact;
  return (
    <div>
      <p>{name}</p>
      <p>{company}</p>
      <p>{position}</p>
      <p>{email}</p>
      <p>{phone}</p>
      <div>
        <Link
          className="bg-surface-1 text-text border-border hover:bg-surface-2 focus-visible:outline-focus-ring rounded-md border px-4 py-2 text-sm outline-offset-2"
          to={`./edit`}
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
