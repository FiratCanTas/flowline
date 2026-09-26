import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { deleteContact, getContacts } from '../features/contacts/api/contacts';
import Button from '../components/ui/Button';
import LinkButton from '../components/ui/LinkButton';

const ContactDetail = () => {
  const { id: contactId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: contacts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  const { mutate: deleteContactMutation, isPending } = useMutation({
    mutationKey: ['delete contact'],
    mutationFn: (id) => deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      navigate('/contacts');
    },
  });

  const contact = contacts?.find((contact) => contact.id === contactId);

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>{error.message}</span>;
  } else if (!contact) return <p>The contact has not found.</p>;

  const { name, company, position, email, phone } = contact;

  const handleDeleteContact = () => {
    const result = window.confirm('Do you want to delete the contact?');
    if (result) {
      deleteContactMutation(contactId);
    }
  };
  return (
    <div className="bg-surface-1 border-border flex flex-col gap-5 rounded-xl border p-6">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xl font-semibold">{name}</p>
          <p className="text-text-muted text-sm">
            <span>{company}</span> · <span>{position}</span>
          </p>
        </div>
        <div className="border-border flex flex-col gap-0.5 border-t pt-5">
          <p className="text-text-muted text-xs font-medium uppercase">email</p>
          <p className="text-sm">{email}</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-text-muted text-xs font-medium uppercase">phone</p>
          <p className="text-sm">{phone}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <LinkButton to="./edit" variant="secondary">
          Edit
        </LinkButton>

        <Button variant="danger" disabled={isPending} onClick={handleDeleteContact}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ContactDetail;
