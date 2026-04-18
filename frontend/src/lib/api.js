const API_BASE = '/api';

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  getListings: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/listings${query ? `?${query}` : ''}`);
  },

  getListingById: (id) => fetchAPI(`/listings/${id}`),

  createListing: (data) => fetchAPI('/listings', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  updateListing: (id, data) => fetchAPI(`/listings/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  claimListing: (id, userId) => fetchAPI(`/listings/${id}/claim`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }),

  deleteListing: (id) => fetchAPI(`/listings/${id}`, {
    method: 'DELETE',
  }),

  getUsers: () => fetchAPI('/users'),

  getUserById: (id) => fetchAPI(`/users/${id}`),

  createUser: (data) => fetchAPI('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  getActivities: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/activities${query ? `?${query}` : ''}`);
  },

  createActivity: (data) => fetchAPI('/activities', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  getCurrentUser: () => fetchAPI('/users/'),

  healthCheck: () => fetchAPI('/health'),

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const url = `${API_BASE}/upload`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  },
};

export default api;