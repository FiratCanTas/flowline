import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  phone: z.string().nonempty('Phone number is required'),
  company: z.string().nonempty('Company is required'),
  position: z.string().nonempty('Position is required'),
});

export default contactSchema;
