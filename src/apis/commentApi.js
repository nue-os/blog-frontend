import { deleteRequest, getRequest, postRequest } from './api'

export const createComment = commentData => postRequest('/comments', commentData)
export const getComments = postId => getRequest(`/comments/${postId}`)
export const deleteComment = commentId => deleteRequest(`/comments/${commentId}`)
