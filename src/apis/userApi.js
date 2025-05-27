import { getRequest, postRequest, putRequest } from './api'

export const signUp = userData => postRequest('/auth/signup', userData)
export const login = userData => postRequest('/auth/login', userData)
export const logout = () => postRequest('/auth/logout')
export const getUserProfile = () => getRequest(`/auth/profile`)

export const getUserInfo = username => getRequest(`/users/${username}`)
export const getUserPosts = username => getRequest(`/users/${username}/posts`)
export const getUserComments = username => getRequest(`/users/${username}/comments`)
export const getUserLikes = username => getRequest(`/users/${username}/likes`)
export const updateUserInfo = userData => putRequest('/users/update', userData)
