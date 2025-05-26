import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import { toggleLike } from '../apis/postApi'

const LikeButton = ({ postId, likes }) => {
  const navigate = useNavigate()

  const userId = useUserStore(state => state.userId)

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
      const data = await toggleLike(postId)
      setIsLiked(prevIsLiked => !prevIsLiked)
      setLikesCount(data.likes.length)
    } catch (error) {
      console.error('좋아요 토글 실패:', error)
      if (error.status === 401) {
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
      <span>{likesCount} </span>
    </span>
  )
}

export default LikeButton
