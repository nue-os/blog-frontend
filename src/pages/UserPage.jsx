import { Link, useNavigate, useParams } from 'react-router-dom'
import { formatDate } from '../utils/features'
import { useEffect, useState } from 'react'
import { likesData } from '../mocks/data'
import { getUserComments, getUserInfo, getUserPosts } from '../apis/userApi'
import useUserStore from '../store/useUserStore'

const UserPage = () => {
  const navigate = useNavigate()
  const { username } = useParams()

  const id = useUserStore(state => state.id)
  const isCurrentUser = id === username

  const [userData, setUserData] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const [userComments, setUserComments] = useState([])
  const [userLikes, setUserLikes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)

        // API 호출을 통해 데이터 가져오기
        const userInfo = await getUserInfo(username)
        const postsData = await getUserPosts(username)
        const commentsData = await getUserComments(username)
        // const likesData = await getUserLikes(username)

        setUserData(userInfo)
        setUserPosts(postsData)
        setUserComments(commentsData)
        setUserLikes(likesData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [username])

  // 회원 탈퇴 처리 함수
  const handleDeleteAccount = async () => {
    // 확인 대화상자 표시
    const confirmed = window.confirm(
      '정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없으며, 모든 계정 정보가 삭제됩니다.'
    )

    if (!confirmed) return

    try {
      setIsDeleting(true)
      //   await deleteAccount()

      // Redux 상태 초기화
      // dispatch(setUserInfo(''))

      alert('회원 탈퇴가 완료되었습니다.')
      navigate('/', { replace: true })
    } catch (err) {
      console.error('회원 탈퇴 실패:', err)
      alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.')
      setIsDeleting(false)
    }
  }

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>{error}</div>
  if (!userData) return <div>사용자를 찾을 수 없습니다.</div>

  return (
    <main>
      <h2>{username}님의 페이지</h2>

      <section className="border-b border-dotted border-[#ccc]">
        <h3 className="mb-2">사용자 정보</h3>
        <div className="bg-[#f5f5f5] p-4 rounded mb-4">
          <p>
            <strong>사용자 이름:</strong> {username}
          </p>
          <p>
            <strong>가입일:</strong> {formatDate(userData.createdAt)}
          </p>
          {isCurrentUser && (
            <div className="flex justify-end items-center gap-2 text-sm">
              <Link
                to={`/update-profile`}
                className="bg-violet-400 text-white border-none px-4 py-2 rounded cursor-pointer font-bold inline-block hover:bg-violet-500"
              >
                정보 수정
              </Link>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className={`px-4 py-2 text-white rounded border-0 font-bold transition-colors duration-300 
                    ${isDeleting ? 'bg-red-200 cursor-not-allowed hover:bg-red-200' : 'bg-red-400 cursor-pointer hover:bg-red-500'}`}
              >
                {isDeleting ? '처리 중...' : '회원 탈퇴'}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="mt-3">
        <h3>작성한 글 ({userPosts.length})</h3>
        {userPosts.length > 0 ? (
          <ul className="list-none p-0 flex flex-col gap-2 py-2">
            {userPosts.map(post => (
              <li
                key={post._id}
                className="border border-[#ddd] rounded-lg p-4 transition-transform transition-shadow duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
              >
                <Link to={`/detail/${post._id}`}>
                  <p className="my-2 text-[#333]">{post.title}</p>
                  <p className="text-[#777] text-xs flex justify-between mt-2">
                    {formatDate(post.createdAt)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm py-4">작성한 글이 없습니다.</p>
        )}
      </section>

      <section className="mt-3">
        <h3>작성한 댓글 ({userComments.length})</h3>
        {userComments.length > 0 ? (
          <ul className="list-none p-0 flex flex-col gap-2 py-2">
            {userComments.map(comment => (
              <li
                key={comment._id}
                className="border border-[#ddd] rounded-lg p-4 transition-transform transition-shadow duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
              >
                <p className="italic bg-[#f9f9f9] p-2 border-l-4 border-[#ddd] mb-2">
                  {comment.content}
                </p>
                <div className="text-[#777] text-xs flex justify-between mt-2">
                  <Link to={`/detail/${comment.postId}`}>원문 보기</Link>
                  <p>작성일:{formatDate(comment.createdAt)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm py-4">작성한 댓글이 없습니다.</p>
        )}
      </section>

      <section className="mt-3">
        <h3>좋아요 클릭한 글 ({userLikes.length})</h3>
        {userLikes.length > 0 ? (
          <ul className="flex items-center gap-2 py-2">
            {userLikes.map(post => (
              <li key={post._id}>
                <Link
                  to={`/detail/${post._id}`}
                  className="block w-[50px] h-[50px] overflow-hidden"
                >
                  {post.cover ? (
                    <img
                      src={`${import.meta.env.VITE_BACK_URL}/${post.cover}`}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <img
                      src="https://picsum.photos/200/300"
                      alt="기본 이미지"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm py-4">좋아요 클릭한 글이 없습니다.</p>
        )}
      </section>
    </main>
  )
}

export default UserPage
