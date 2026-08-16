import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router';
import { deleteContact, getContacts } from '../features/contacts/api/contacts';
import Button from '../components/ui/Button';

const ContactDetail = () => {
  const { id: contactId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['delete contact'],
    mutationFn: () => deleteContact(contactId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      navigate('/contacts');
    },
  });

  const contact = data?.find((contact) => contact.id === contactId);

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>{error.message}</span>;
  } else if (!contact) return <p>The contact has not found.</p>;

  const { name, company, position, email, phone } = contact;

  const handleDeleteContact = () => {
    const result = window.confirm('Do you want to delete the contact?');
    if (result) {
      mutate();
    }
  };
  return (
    <div>
      <p>{name}</p>
      <p>{company}</p>
      <p>{position}</p>
      <p>{email}</p>
      <p>{phone}</p>
      <div className="flex gap-2">
        <Link
          className="bg-surface-1 text-text border-border hover:bg-surface-2 focus-visible:outline-focus-ring rounded-md border px-4 py-2 text-sm outline-offset-2"
          to={`./edit`}
        >
          Edit
        </Link>
        <Button variant="danger" disabled={isPending} onClick={handleDeleteContact}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ContactDetail;
