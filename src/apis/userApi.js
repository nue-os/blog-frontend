import { getRequest, postRequest } from './api'

export const signUp = userData => postRequest('/signUp', userData)
export const login = userData => postRequest('/login', userData)
export const getUserProfile = () => getRequest('/profile')
export const logout = () => postRequest('/logout')
