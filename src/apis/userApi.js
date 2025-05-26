import { getRequest, postRequest } from './api'

export const signUp = userData => postRequest('/signUp', userData)
export const login = userData => postRequest('/login', userData)
export const logout = () => postRequest('/logout')

export const getUserProfile = () => getRequest(`/profile`)
export const getUserInfo = username => getRequest(`/user/${username}`)
export const getUserPosts = username => getRequest(`/user/${username}/posts`)
