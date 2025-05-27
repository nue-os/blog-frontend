import { deleteRequest, getRequest, postRequest, putRequest } from './api'

export const createPost = postData => postRequest('/posts', postData)
export const getPostList = (page = 0, limit = 3) => getRequest('/posts', { page, limit })
export const getPostDetail = postId => getRequest(`/posts/${postId}`)
export const updatePost = (postId, postData) => putRequest(`/posts/${postId}`, postData)
export const deletePost = postId => deleteRequest(`/posts/${postId}`)

export const toggleLike = postId => postRequest(`/posts/${postId}/like`)
