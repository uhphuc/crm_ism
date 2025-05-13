import api from './index'

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

export const getCustomerByEmail = async (email) => {
    try {
        const response = await api.get(`/customers/email/${email}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching customer by email:', error);
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

export const getActivityByCustomerId = async (customerId) => {
    try {
        const response = await api.get(`/activities/customer/${customerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching activity by customer ID:', error);
        throw error;
    }
}

