import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Set your desired baseURL here
})

export default axiosInstance
