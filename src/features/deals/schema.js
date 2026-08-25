import * as z from 'zod';

const dealSchema = z.object({
  title: z.string().nonempty('Title is required!'),
  contactId: z.string().nonempty('Contact is required!'),
  value: z.coerce.number().positive('Value can not be lower than 0!'),
  stage: z.enum(['lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost']),
});

export default dealSchema;
