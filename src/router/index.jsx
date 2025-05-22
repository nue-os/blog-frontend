import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '../layout/DefaultLayout'
import SignUpPage from '../pages/SignUpPage'

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
    ],
  },
])
