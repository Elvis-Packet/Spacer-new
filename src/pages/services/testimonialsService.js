import { API_BASE_URL, handleResponse, getAuthHeader } from '../../config/api';

export const testimonialsService = {
  getTestimonials: async () => {
    const response = await fetch(`${API_BASE_URL}/testimonials`);
    return handleResponse(response);
  },

  getTestimonialById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`);
    return handleResponse(response);
  },

  createTestimonial: async (testimonialData) => {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(testimonialData),
    });
    return handleResponse(response);
  },

  deleteTestimonial: async (id) => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
    return handleResponse(response);
  }
};
