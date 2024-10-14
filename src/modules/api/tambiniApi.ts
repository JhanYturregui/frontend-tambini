import axios from 'axios';

const tambiniApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export default tambiniApi;
