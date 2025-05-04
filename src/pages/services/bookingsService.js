import { API_BASE_URL, handleResponse, getAuthHeader } from '../../config/api';

export const bookingsService = {
  getBookings: async () => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      headers: {
        ...getAuthHeader(),
      },
    });
    return handleResponse(response);
  },

  getBookingById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      headers: {
        ...getAuthHeader(),
      },
    });
    return handleResponse(response);
  },

  createBooking: async (bookingData) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(bookingData),
    });
    return handleResponse(response);
  },

  cancelBooking: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
    return handleResponse(response);
  }
};
