import axios from 'axios';
export const BACKEND_URL = "http://192.168.110.203:8000"
export const BACKEND_URL_IMAGES = "http://192.168.110.203:8000/storage/"
export const  api = axios.create({
  baseURL:  BACKEND_URL, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Authorization': `Bearer ${your_token}` if needed
  }
});


