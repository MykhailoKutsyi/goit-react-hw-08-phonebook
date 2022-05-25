export const getFilter = state => state.filter;
export const getState = state => state;

export const getFilteredContacts = (filter, contacts) => {
  const normalizeFilter = filter.toLowerCase();
  return contacts?.filter(
    ({ name, number }) =>
      name.toLowerCase().includes(normalizeFilter) ||
      number.includes(normalizeFilter)
  );
};
