import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://team-auction-api.onrender.com'
    // baseURL: 'http://localhost:3000',
})

export default Api
