import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { getContacts, updateContact } from '../features/contacts/api/contacts';
import ContactForm from '../features/contacts/components/ContactForm';
import Loading from '../components/ui/Loading';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';

const ContactEdit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: contactId } = useParams();

  const {
    data: contacts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  const { mutate: updateContactMutation, isPending } = useMutation({
    mutationKey: ['update contact'],
    mutationFn: (data) => updateContact(contactId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      navigate(`/contacts/${contactId}`);
    },
  });

  if (isLoading) return <Loading className="h-full" />;
  else if (error)
    return (
      <ErrorMessage className="h-full">
        Something went wrong! Error:
        {error.message}
      </ErrorMessage>
    );

  const contact = contacts?.find((contact) => contact.id === contactId);

  if (!contact) return <EmptyState className="h-full">Contact not found.</EmptyState>;

  return (
    <div>
      <ContactForm
        defaultValues={contact}
        onSubmit={(formData) => updateContactMutation(formData)}
        disabled={isPending}
      />
    </div>
  );
};

export default ContactEdit;
