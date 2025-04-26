import axios from 'axios';

export const  api = axios.create({
  baseURL: "http://192.168.110.194:8000/api", 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Authorization': `Bearer ${your_token}` if needed
  }
});


