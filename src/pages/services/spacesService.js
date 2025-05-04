import { API_BASE_URL, handleResponse, getAuthHeader } from '../../config/api';

export const spacesService = {
  getSpaces: async () => {
    const response = await fetch(`${API_BASE_URL}/spaces`);
    return handleResponse(response);
  },

  getSpaceById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/spaces/${id}`);
    return handleResponse(response);
  },

  createSpace: async (spaceData) => {
    const response = await fetch(`${API_BASE_URL}/spaces`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(spaceData),
    });
    return handleResponse(response);
  },

  updateSpace: async (id, spaceData) => {
    const response = await fetch(`${API_BASE_URL}/spaces/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(spaceData),
    });
    return handleResponse(response);
  },

  deleteSpace: async (id) => {
    const response = await fetch(`${API_BASE_URL}/spaces/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
    });
    return handleResponse(response);
  }
};
