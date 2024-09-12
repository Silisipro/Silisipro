import axios from 'axios';
const url = 'https://v6.exchangerate-api.com/v6/90e4084eb6cf5ee57b1860c5/latest/';

export const getExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(`${url}${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error('There was a problem with the request:', error);
    throw error; 
  }
};