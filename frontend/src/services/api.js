import axios from 'axios'

const api = axios.create({
 baseURL: 'http://192.168.18.109:8000/api'
})

export default api
