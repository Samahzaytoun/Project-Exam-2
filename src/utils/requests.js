import api from './api';

export const venueRequests = {
  getAllVenues: async () => (await api.get(`/venues?limit=100&_owner=true`)).data,
  getSingleVenue: async (id) => (await api.get(`/venues/${id}?_owner=true&_bookings=true`)).data,
  createVenue: async (venue) => (await api.post(`/venues`, venue)).data,
  updateVenue: async (venue) => (await api.put(`/venues/${venue?.id}`, venue)).data,
  deleteVenue: async (id) => (await api.delete(`/venues/${id}`)).data,
  getVenuesByProfileName: async (name) => (await api.get(`/profiles/${name}/venues`)).data,
};

export const profileRequests = {
  getProfileByName: async (name) => (await api.get(`/profiles/${name}`)).data,
  updateProfileByName: async (name, profile) => (await api.put(`/profiles/${name}/media`, profile)).data,
};

export const authRequests = {
  login: async (credentials) => (await api.post(`/auth/login`, credentials)).data,
  register: async (credentials) => (await api.post(`/auth/register`, credentials)).data,
};

export const bookingRequests = {
  bookVenue: async (booking) => (await api.post(`/bookings`, booking)).data,
  getBookingsByProfileName: async (name) => (await api.get(`/profiles/${name}/bookings?_venue=true`)).data,
  deleteBooking: async (id) => (await api.delete(`/bookings/${id}`)).data,
};
