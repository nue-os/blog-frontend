import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import Input from '../components/Input'
import { getUserProfile, updateUserInfo } from '../apis/userApi'

const UserInfoUpdate = () => {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const { userId, id, setUserId } = useUserStore()

  useEffect(() => {
    // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
    if (!userId) {
      navigate('/login', { replace: true })
    }
  }, [userId, navigate])

  const handlePasswordChange = e => setPassword(e.target.value)
  const handleConfirmPasswordChange = e => setConfirmPassword(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    // 비밀번호 유효성 검사
    if (password) {
      if (password.length < 4) {
        setError('비밀번호는 최소 4자 이상이어야 합니다.')
        return
      }

      if (password !== confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.')
        return
      }
    }

    try {
      setLoading(true)

      // 비밀번호 변경 요청
      const userData = {
        password: password || undefined, // 비밀번호가 비어있으면 undefined로 설정하여 서버에 전송하지 않음
      }

      await updateUserInfo(userData)

      // 프로필 정보 다시 불러오기
      const updatedProfile = await getUserProfile()
      setUserId(updatedProfile._id)

      setSuccess(true)

      // 1초 후 성공 메시지 숨기기
      setTimeout(() => {
        setSuccess(false)
        navigate(`/userpage/${id}`)
        setPassword('')
        setConfirmPassword('')
      }, 1000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate(`/userpage/${id}`)
  }

  if (!userId) return null // 로그인 상태가 아니면 아무것도 렌더링하지 않음

  return (
    <main>
      <h2>내 정보 수정</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="id" className="font-semibold text-[#444]">
            아이디
          </label>
          <Input type="text" id="id" value={id || ''} disabled />
          <p className="text-sm text-[#777] mt-1">아이디는 변경할 수 없습니다.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">새 비밀번호</label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="변경할 비밀번호를 입력하세요"
          />
          <p className="text-sm text-[#777] mt-1">
            비밀번호는 최소 4자 이상이어야 합니다. 변경하지 않으려면 비워두세요.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="비밀번호 확인"
          />
        </div>

        {error && (
          <div className="text-[#d32f2f] bg-[#ffebee] p-[0.8rem] rounded mb-4 text-sm">{error}</div>
        )}
        {success && (
          <div className="text-[#388e3c] bg-[#e8f5e9] p-[0.8rem] rounded mb-4 text-sm">
            사용자 정보가 성공적으로 업데이트되었습니다.
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className={`bg-gray-300 text-gray-700 px-8 py-3 border-none rounded text-base cursor-pointer transition-colors duration-200 hover:bg-gray-400 hover:text-white
                ${loading ? 'opacity-70 cursor-not-allowed' : ''} `}
            disabled={loading}
          >
            취소
          </button>
          <button
            type="submit"
            className={`bg-violet-300 px-8 py-3 border-none rounded text-base cursor-pointer transition-colors duration-200 hover:bg-violet-400 hover:text-white
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? '처리 중...' : '저장'}
          </button>
        </div>
      </form>
    </main>
  )
}

export default UserInfoUpdate
