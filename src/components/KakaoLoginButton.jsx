import kakaoLoginBtn from '../assets/kakao.png'

const API_URL = import.meta.env.VITE_BACK_URL

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    window.location.href = `${API_URL}/auth/kakao/login`
  }
  return (
    <button onClick={handleKakaoLogin} className="w-[50px]">
      <img src={kakaoLoginBtn} alt="카카오 로그인" />
    </button>
  )
}

export default KakaoLoginButton
