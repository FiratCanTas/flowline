import ContactForm from '../features/contacts/components/ContactForm';

const ContactNew = () => {
  return (
    <div>
      <ContactForm onSubmit={(data) => console.log('creating contact:', data)} />
    </div>
  );
};

export default ContactNew;
