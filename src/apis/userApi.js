import { postRequest } from './api'

export const signUp = userData => postRequest('/signUp', userData)
