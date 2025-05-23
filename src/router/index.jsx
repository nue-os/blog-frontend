import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '../layout/DefaultLayout'
import SignUpPage from '../pages/SignUpPage'
import LoginPage from '../pages/LoginPage'
import PostListPage from '../pages/PostListPage'
import PostDetailPage from '../pages/PostDetailPage'
import CreatePost from '../pages/CreatePost'
import { EditePost } from '../pages/EditPost'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <div>에러</div>,
    children: [
      {
        index: true,
        element: <PostListPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/detail/:postId',
        element: <PostDetailPage />,
      },
      {
        path: '/createPost',
        element: <CreatePost />,
      },
      {
        path: '/edit/:postId',
        element: <EditePost />,
      },
    ],
  },
])
