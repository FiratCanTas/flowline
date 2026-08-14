import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getContacts } from '../features/contacts/api/contacts';
import ContactForm from '../features/contacts/components/ContactForm';

const ContactEdit = () => {
  const { id: contactId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  if (isLoading) return <p>Loading...</p>;
  else if (error) return <p>Someting went wrong... Error:{error.message}</p>;

  const contact = data?.find((contact) => contact.id === contactId);

  if (!contact) return <p>The contact is not found.</p>;

  return (
    <div>
      <ContactForm
        defaultValues={contact}
        onSubmit={(data) => console.log('updating contact:', data)}
      />
    </div>
  );
};

export default ContactEdit;
