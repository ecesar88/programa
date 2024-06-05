import axios from 'axios'

const server = axios.create({
  // TODO: get from .env
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default server
