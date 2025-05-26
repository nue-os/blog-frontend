import { getRequest, postRequest } from './api'

export const createPost = formData => postRequest('/postWrite', formData)
export const getPostList = (page = 0, limit = 3) => getRequest('/postList', { page, limit })
