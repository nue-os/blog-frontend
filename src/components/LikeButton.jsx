import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LikeButton = ({ postId, likes }) => {
  const navigate = useNavigate()
  const userId = 1 // 임시

  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes ? likes.length : 0)

  useEffect(() => {
    if (userId && likes) {
      const userLiked = likes.includes(userId)
      setIsLiked(userLiked)
    } else {
      setIsLiked(false)
    }
    setLikesCount(likes ? likes.length : 0)
  }, [likes, userId])

  const handleLikeToggle = async e => {
    e.stopPropagation()

    try {
      // 좋아요 토글 API 호출
      // const updatedPost = await toggleLike(postId)

      setIsLiked(prevIsLiked => !prevIsLiked)
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
    } catch (error) {
      console.error('좋아요 토글 실패:', error)

      if (error.response && error.response.status === 401) {
        alert('로그인이 필요합니다.')
        navigate('/login')
      }
    }
  }
  return (
    <span>
      <span onClick={handleLikeToggle} className="cursor-pointer">
        {isLiked ? '❤️ ' : '🤍 '}
      </span>
      <span>{likesCount}</span>
    </span>
  )
}

export default LikeButton
