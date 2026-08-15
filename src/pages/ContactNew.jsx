import { useMutation, useQueryClient } from '@tanstack/react-query';
import ContactForm from '../features/contacts/components/ContactForm';
import { addContact } from '../features/contacts/api/contacts';
import { useNavigate } from 'react-router';

const ContactNew = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: addContactMutation } = useMutation({
    mutationKey: ['add contact'],
    mutationFn: (data) => addContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      navigate('/contacts');
    },
  });

  return (
    <div>
      <ContactForm onSubmit={(data) => addContactMutation(data)} disabled={isPending} />
    </div>
  );
};

export default ContactNew;
