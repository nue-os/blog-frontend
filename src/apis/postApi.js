import { deleteRequest, getRequest, postRequest, putRequest } from './api'

export const createPost = postData => postRequest('/postWrite', postData)
export const getPostList = (page = 0, limit = 3) => getRequest('/postList', { page, limit })
export const getPostDetail = postId => getRequest(`/post/${postId}`)
export const updatePost = (postId, postData) => putRequest(`/post/${postId}`, postData)
export const deletePost = postId => deleteRequest(`/post/${postId}`)
