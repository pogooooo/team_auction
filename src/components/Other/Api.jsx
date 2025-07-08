import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://team-auction-api.onrender.com'
})

export default Api
