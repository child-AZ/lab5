import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://dv-student-backend-2019.appspot.com',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000,
})

export default {
  getStudents() {
    return apiClient.get('/students')
  }
}