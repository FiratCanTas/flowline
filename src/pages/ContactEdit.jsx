import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { getContacts, updateContact } from '../features/contacts/api/contacts';
import ContactForm from '../features/contacts/components/ContactForm';

const ContactEdit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: contactId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['update contact'],
    mutationFn: (data) => {
      return updateContact(contactId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      navigate(`/contacts/${contactId}`);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  else if (error) return <p>Someting went wrong... Error:{error.message}</p>;

  const contact = data?.find((contact) => contact.id === contactId);

  if (!contact) return <p>The contact is not found.</p>;

  return (
    <div>
      <ContactForm defaultValues={contact} onSubmit={(data) => mutate(data)} disabled={isPending} />
    </div>
  );
};

export default ContactEdit;
