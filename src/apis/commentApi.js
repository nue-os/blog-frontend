import { postRequest } from './api'

export const createComment = commentData => postRequest('/comments', commentData)
