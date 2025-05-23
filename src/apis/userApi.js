import { postRequest } from './api'

export const signUp = userData => postRequest('/signUp', userData)
export const login = userData => postRequest('/login', userData)
