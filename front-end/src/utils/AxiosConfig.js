import { baseURL } from '../common/ApiBackend'
import axios from 'axios'

const axiosConfig = axios.create({
     baseURL: baseURL,
     withCredentials: true
})

export default axiosConfig