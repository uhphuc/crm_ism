import api from './index'; // Adjust the import path as necessary

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

export const getCustomerById = async (customerId) => {
  try {
    const response = await api.get(`/customers/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    throw error;
  }
}
export const editCustomerById = async (customerId, customerData) => {
  try {
    const response = await api.put(`/customers/${customerId}`, customerData);
    return response.data;
  } catch (error) {
    console.error('Error updating customer by ID:', error);
    throw error;
  }
}

export const getDealById = async (dealId) => {
  try {
    const response = await api.get(`/deals/${dealId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching deal by ID:', error);
    throw error;
  }
}
export const getDealsByCustomerId = async (customerId) => {
    try {
        const response = await api.get(`/deals/customer/${customerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching deals by customer ID:', error);
        throw error;
    }
    }

export const getNoteById = async (noteId) => {
  try {
    const response = await api.get(`/notes/${noteId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching note by ID:', error);
    throw error;
  }
}

export const getActivityById = async (activityId) => {
  try {
    const response = await api.get(`/activities/${activityId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity by ID:', error);
    throw error;
  }
}

export const getInvoiceById = async (invoiceId) => {
    try {
        const response = await api.get(`/invoices/${invoiceId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching invoice by ID:', error);
        throw error;
    }
}

export const getInvoiceByCustomerId = async (customerId) => {
    try {
        const response = await api.get(`/invoices/customer/${customerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching invoice by customer ID:', error);
        throw error;
    }
}