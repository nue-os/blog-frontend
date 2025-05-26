import axios from 'axios'

const API_URL = import.meta.env.VITE_BACK_URL || 'http://localhost:3000'

export const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, data, { withCredentials: true })
    return response.data
  } catch (error) {
    const status = error.response?.status
    const message = error.response?.data?.message || error.response?.data?.error || '요청 실패'
    const customError = new Error(message)
    customError.status = status
    throw customError
  }
}

export const getRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`, {
      withCredentials: true,
      params: params,
    })
    return response.data
  } catch (error) {
    const status = error.response?.status
    const message = error.response?.data?.message || error.response?.data?.error || '요청 실패'
    const customError = new Error(message)
    customError.status = status
    throw customError
  }
}

export const deleteRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.delete(`${API_URL}${endpoint}`, {
      withCredentials: true,
      params: params,
    })
    return response.data
  } catch (error) {
    const status = error.response?.status
    const message = error.response?.data?.message || error.response?.data?.error || '요청 실패'
    const customError = new Error(message)
    customError.status = status
    throw customError
  }
}
