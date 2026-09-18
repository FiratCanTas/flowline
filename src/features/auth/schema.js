import * as z from 'zod';

const authSchema = z.object({
  email: z.email(),
  password: z.string().nonempty('Password is required'),
});

export default authSchema;
