export const getFilter = state => state.filter;

export const getState = state => state;

export const getIsLoggedIn = state => state.auth.isLoggedIn;

export const getToken = state => state.auth.token;

export const getUsername = state => state.auth.user.name;

export const getFilteredContacts = (filter, contacts) => {
  const normalizeFilter = filter.toLowerCase();
  return contacts?.filter(
    ({ name, number }) =>
      name.toLowerCase().includes(normalizeFilter) ||
      number.includes(normalizeFilter)
  );
};
