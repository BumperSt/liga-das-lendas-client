import axios from 'axios'
//'https://liga-das-lendas-server-6h5gx42wjq-uc.a.run.app'
//'http://127.0.0.1:8080/'
const api = axios.create({
    baseURL:'https://liga-das-lendas-server-6h5gx42wjq-uc.a.run.app',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
})

export default api  