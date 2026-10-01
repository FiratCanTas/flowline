export const convertToActivity = (data) => {
  const { id, title, type, is_completed, due_date, deal_id, created_at, contact_id } = data;

  return {
    id,
    dealId: deal_id,
    contactId: contact_id,
    type,
    title,
    dueDate: due_date,
    isCompleted: is_completed,
    createdAt: created_at,
  };
};
export const convertToDatabaseForm = (activity) => {
  const { id, dealId, contactId, type, title, dueDate, isCompleted, createdAt } = activity;

  return {
    id,
    deal_id: dealId,
    contact_id: contactId,
    type,
    title,
    due_date: dueDate,
    is_completed: isCompleted,
    created_at: createdAt,
  };
};
