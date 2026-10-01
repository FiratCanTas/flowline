export const convertToDeal = (data) => {
  const { id, title, value, stage, created_at, contact_id } = data;

  return {
    id,
    title,
    value,
    stage,
    createdAt: created_at,
    contactId: contact_id,
  };
};
export const convertToDatabaseForm = (deal) => {
  const { id, title, value, stage, createdAt, contactId } = deal;

  return {
    id,
    title,
    value,
    stage,
    created_at: createdAt,
    contact_id: contactId,
  };
};
