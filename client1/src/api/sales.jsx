import api from './index';

export const getMyCustomers = async (userId) => {
  try {
    const response = await api.get(`/customers/${userId}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching my customers:', error);
    throw error;
  }
}

export const updateDealStage = async (dealId, stage) => {
  try {
    const response = await api.put(`/deals/${dealId}/stage`, { stage });
    return response.data;
  } catch (error) {
    console.error('Error updating deal stage:', error);
    throw error;
  }
}

export const createDeal = async (dealData) => {
  try {
    const response = await api.post(`/deals`, dealData);
    return response.data;
  } catch (error) {
    console.error('Error creating deal:', error);
    throw error;
  }
}

export const addNewCustomer = async (customerData) => {
  try {
    const response = await api.post('/customers', customerData);
    return response.data;
  } catch (error) {
    console.error('Error adding new customer:', error);
    throw error;
  }
}

// export const addCustomerNote = async (customerId, noteData) => {
//   try {
//     const response = await api.post(`/customers/${customerId}/notes`, noteData);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding customer note:', error);
//     throw error;
//   }
// }

export const addDealNote = async (dealId, noteData) => {
  try {
    const response = await api.post(`/notes/${dealId}`, noteData);
    return response.data;
  } catch (error) {
    console.error('Error adding deal note:', error);
    throw error;
  }
}

export const getDealNotes = async (dealId) => {
  try {
    const response = await api.get(`/notes/deal/${dealId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching deal notes:', error);
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

export const getDealByUserId = async (userId) => {
  try {
    const response = await api.get(`/deals/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching deals by user ID:', error);
    throw error;
  }
}

export const getAllActivities = async () => {
  try {
    const response = await api.get('/activities');
    return response.data;
  } catch (error) {
    console.error('Error fetching all activities:', error);
    throw error;
  }

}

export const createActivity = async (activityData, userId) => {
  try {
    const response = await api.post(`/activities/user/${userId}`, activityData);
    return response.data;
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
}