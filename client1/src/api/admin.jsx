import api from './index';

export const addNewCustomer = async (customerData) => {
  try {
    const response = await api.post('/customers', customerData);
    return response.data;
  } catch (error) {
    console.error('Error adding new customer:', error);
    throw error;
  }
}
export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await api.put(`/customers/${customerId}`, customerData);
    return response.data;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
}

export const getAllCustomers = async () => {
    try {
        const response = await api.get('/customers');
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
}


export const addNewUser = async (managerData) => {
  try {
    const response = await api.post('/users', managerData);
    return response.data;
  } catch (error) {
    console.error('Error adding new manager:', error);
    throw error;
  }
}

export const assignCustomerToSales = async (customerId, salesId) => {
  try {
    const response = await api.put(`/customers/${customerId}/assign`, { userId: salesId });
    console.log('Customer assigned to sales:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error assigning customer to sales:', error);
    throw error;
  }
}

export const getSalesUsers = async () => {
  try {
    const response = await api.get('/users/sales');
    return response.data;
  } catch (error) {
    console.error('Error fetching sales users:', error);
    throw error;
  }
}

export const getAllDeals = async () => {
  try {
    const response = await api.get('/deals');
    return response.data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
}

export const getAllActivities = async () => {
  try {
    const response = await api.get('/activities');
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
}

export const getAllNotes = async () => {
  try {
    const response = await api.get('/notes');
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
}

export const createInvoice = async (invoiceData) => {
  try {
    const response = await api.post(`/invoices`, invoiceData);
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
}

export const getAllInvoices = async () => {
  try {
    const response = await api.get('/invoices');
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
}

export const updateInvoiceStatus = async (invoiceId, status) => {
  try {
    const response = await api.put(`/invoices/status/${invoiceId}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating invoice status:', error);
    throw error;
  }
}