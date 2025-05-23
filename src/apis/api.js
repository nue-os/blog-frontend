import axios from 'axios'

const API_URL = import.meta.env.VITE_BACK_URL || 'http://localhost:3000'
const API_POST_REQUEST_OPTIONS = {
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

export const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, data, API_POST_REQUEST_OPTIONS)
    return response.data
  } catch (error) {
    const status = error.response?.status
    const message = error.response?.data?.message || error.response?.data?.error || '요청 실패'
    const customError = new Error(message)
    customError.status = status
    throw customError
  }
}
