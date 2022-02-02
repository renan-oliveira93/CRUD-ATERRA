import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost3000/api'
})

export default api