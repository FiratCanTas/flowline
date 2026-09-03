import * as z from 'zod';

const activitySchema = z
  .object({
    dealId: z.string().nonempty('Deal is required'),
    contactId: z.string().nonempty('Contact is required'),
    title: z.string().nonempty('Title is required'),
    type: z.enum(['task', 'note']),
    dueDate: z.string().nullable(),
    isCompleted: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.type === 'task' && !data?.dueDate?.trim()) {
        return false;
      } else return true;
    },
    {
      error: 'Due date can not be empty!',
      path: ['dueDate'],
    },
  );

export default activitySchema;
