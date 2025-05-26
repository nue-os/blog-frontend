import { postRequest } from './api'

export const createPost = formData => postRequest('/postWrite', formData)
