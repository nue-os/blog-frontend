import { deleteRequest, getRequest, postRequest, putRequest } from './api'

export const createComment = commentData => postRequest('/comments', commentData)
export const getComments = postId => getRequest(`/comments/${postId}`)
export const updateComment = (commentId, content) =>
  putRequest(`/comments/${commentId}`, { content })
export const deleteComment = commentId => deleteRequest(`/comments/${commentId}`)
