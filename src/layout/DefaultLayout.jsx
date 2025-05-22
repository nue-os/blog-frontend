import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const DefaultLayout = () => {
  return (
    <div className="max-w-[600px] h-screen mx-auto relative overflow-y-auto overflow-x-hidden pb-8 shadow-lg">
      <Header />
      <Outlet />
    </div>
  )
}

export default DefaultLayout
