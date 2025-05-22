import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '../layout/DefaultLayout'
import SignUpPage from '../pages/SignUpPage'
import LoginPage from '../pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <div>에러</div>,
    children: [
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
])
