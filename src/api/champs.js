import api from './index'

export default {
    getChampsRotation: () => api.get('/champRotation'),
    getChampsMaestry: (data) => api.post('/getChampsMaestry', data),
    getChampsMatch: (data) => api.post('/getChampMatch', data)
}