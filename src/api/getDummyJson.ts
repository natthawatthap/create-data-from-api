import axios from 'axios';

const API_URL = 'https://dummyjson.com/users';

export async function fetchData() {
  try {
    const response = await axios.get(API_URL);
    return response.data.users;
  } catch (error) {
    throw error;
  }
}