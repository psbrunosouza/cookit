import axios from 'axios';

const api = axios.create({
    baseURL: "https://60bbd2283a39900017b2df38.mockapi.io/cookit/api/v1"
})

export default api;