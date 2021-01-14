import axios from 'axios'

const api = axios.create({
    baseURL:'http://lvh.me:8080/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
})

export default api