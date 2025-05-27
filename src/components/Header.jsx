import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import { getUserProfile, logout } from '../apis/userApi'

const Header = () => {
  const navigate = useNavigate()

  const { userId, id, setUserId, setId, resetUser } = useUserStore()

  const [isMenuActive, setIsMenuActive] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getProfile = async () => {
      try {
        setIsLoading(true)
        const userData = await getUserProfile()
        if (userData) {
          if (!userId && userData._id) {
            setUserId(userData._id)
          }
          if (userData.id) {
            setId(userData.id)
          }
        } else {
          resetUser()
        }
      } catch (err) {
        console.log(err.message)
        resetUser()
      } finally {
        setIsLoading(false)
      }
    }
    getProfile()
  }, [userId, setUserId, setId, resetUser])

  const toggleMenu = () => {
    setIsMenuActive(prev => !prev)
  }
  const closeMenu = () => {
    setIsMenuActive(false)
  }

  // 배경 클릭 시, 메뉴 닫기
  const handleBackgroundClick = e => {
    if (e.target === e.currentTarget) {
      closeMenu()
    }
  }

  // 메뉴 안쪽 클릭 시, 메뉴 닫지 않음 (부모로 이벤트 전파되는 것을 막음)
  const handleGnbClick = e => {
    e.stopPropagation()
  }

  const handleLogout = async () => {
    try {
      await logout()
      resetUser()
      setIsMenuActive(false)
      navigate('/', { replace: true })
    } catch (err) {
      console.log('로그아웃 실패:', err)
    }
  }

  if (isLoading) {
    return (
      <header className="flex justify-between items-center bg-violet-100 p-4 sticky top-0 w-full z-[9999]">
        <h1>
          <Link to={'/'}>BLOG</Link>
        </h1>
        <div>로딩 중...</div>
      </header>
    )
  }

  return (
    <header className="flex justify-between items-center bg-violet-100 p-4 sticky top-0 w-full z-[9999]">
      <h1>
        <Link to={'/'} className="text-xl font-bold">
          BLOG
        </Link>
      </h1>
      <Hamburger isMenuActive={isMenuActive} toggleMenu={toggleMenu} />
      <nav
        className={`absolute top-0 right-0 w-full h-screen transition-colors duration-300 z-[90] 
          ${isMenuActive ? 'bg-black/50 backdrop-blur-sm pointer-events-auto' : 'bg-transparent backdrop-blur-0 pointer-events-none'}`}
        onClick={handleBackgroundClick}
      >
        <div
          className={`absolute top-0 -right-1/2 w-1/2 h-full bg-violet-100 pt-20 px-4 pb-0 transition-[right] duration-300 ease-in-out z-[95] 
            ${isMenuActive ? 'right-0 ' : ''}`}
          onClick={handleGnbClick}
        >
          {userId && id ? (
            <div className="flex flex-col gap-2">
              <MenuLike to="/createPost" label="글쓰기" closeMenu={closeMenu} />
              <MenuLike to={`/userpage/${id}`} label={`마이페이지(${id})`} closeMenu={closeMenu} />
              <button className="px-4 py-2 text-orange-500 text-left" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <MenuLike to="/signup" label="회원가입" closeMenu={closeMenu} />
              <MenuLike to="/login" label="로그인" closeMenu={closeMenu} />
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

const MenuLike = ({ to, label, closeMenu }) => (
  <NavLink
    to={to}
    onClick={closeMenu}
    className={({ isActive }) =>
      `block px-4 py-2 text-[#333] no-underline hover:bg-white hover:rounded-[30px] ${
        isActive ? 'bg-white  rounded-[30px]' : ''
      }`
    }
  >
    {label}
  </NavLink>
)

const Hamburger = ({ isMenuActive, toggleMenu }) => (
  <button
    onClick={toggleMenu}
    className="absolute top-4 right-4 w-8 h-8 rounded-full z-[100] border-none cursor-pointer flex justify-center items-center transition-colors"
    aria-label="Toggle menu"
  >
    {isMenuActive ? (
      // X 아이콘
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-5 h-5"
        viewBox="0 0 16 16"
      >
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
      </svg>
    ) : (
      // 햄버거 아이콘
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="w-5 h-5"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
        />
      </svg>
    )}
  </button>
)

export default Header
