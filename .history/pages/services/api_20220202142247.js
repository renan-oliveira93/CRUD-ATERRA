import axios from "axios"
const url='http://localhost:3000/api/123'

const api = axios.create({
    baseURL: url
})

export default api