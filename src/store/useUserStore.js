import { create } from 'zustand'

const getInitialUserId = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userId') || null
  }
  return null
}
const useUserStore = create(set => ({
  userId: getInitialUserId(),
  id: null,
  setUserId: userId => {
    localStorage.setItem('userId', userId)
    set({ userId })
  },
  setId: id => set({ id }),
  resetUser: () => {
    localStorage.removeItem('userId')
    set({ userId: null, id: null })
  },
}))

export default useUserStore
