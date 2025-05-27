import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { formatDate } from '../utils/features'
import LikeButton from '../components/LikeButton'
import { Comments } from '../components/Comments'
import { deletePost, getPostDetail } from '../apis/postApi'
import useUserStore from '../store/useUserStore'
import DOMPurify from 'dompurify'

const PostDetailPage = () => {
  const id = useUserStore(state => state.id)
  const navigate = useNavigate()

  const { postId } = useParams()
  const [postInfo, setPostInfo] = useState({})
  const [commentCount, setCommentCount] = useState(0)

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const data = await getPostDetail(postId)
        setPostInfo(data)
        setCommentCount(data.commentCount || 0)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPostDetail()
  }, [postId])

  const handleDeletePost = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deletePost(postId)
        alert('삭제되었습니다.')
        navigate('/')
      } catch (error) {
        alert(error.message)
      }
    }
  }

  // 댓글 수를 업데이트하는 함수
  const updateCommentCount = count => setCommentCount(count)

  return (
    <main>
      <h2>{postInfo.title}</h2>
      <section>
        {postInfo.cover && (
          <div className="overflow-hidden">
            <img
              src={`${import.meta.env.VITE_BACK_URL}/${postInfo.cover}`}
              alt={postInfo.title}
              className="w-full h-auto object-contain"
            />
          </div>
        )}
        <div className="flex justify-between items-center gap-8 p-4 text-[0.7rem]">
          <p className="text-dodgerblue font-bold py-1 pr-4 pl-0 hover:text-blue-800">
            <Link to={`/userpage/${postInfo.author}`}>{postInfo.author}</Link>
          </p>
          <p className="text-[#999] ml-2 flex-1">{formatDate(postInfo.createdAt)}</p>
          <p>
            {postInfo && <LikeButton postId={postId} likes={postInfo.likes} />}
            <span className="ml-[10px]">💬 {commentCount}</span>
          </p>
        </div>
        <div className="bg-[#eaeaea] p-4 rounded-[1rem] italic">{postInfo.summary}</div>
        <div
          className="p-4 break-words prose"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              postInfo.content ? postInfo.content.replace(/\n/g, '<br />') : ''
            ),
          }}
        ></div>
      </section>

      <section className="py-4 flex gap-4 justify-end items-center border-t border-b border-dotted border-[#e3e3e3]">
        {id === postInfo.author && (
          <>
            <Link
              to={`/edit/${postId}`}
              className="bg-violet-200 text-sm rounded-[10px] px-4 py-1 cursor-pointer transition duration-30 hover:bg-violet-300 hover:text-white"
            >
              수정
            </Link>
            <span
              onClick={handleDeletePost}
              className="bg-violet-200 text-sm rounded-[10px] px-4 py-1 cursor-pointer transition duration-300 hover:bg-violet-300  hover:text-white"
            >
              삭제
            </span>
          </>
        )}
        <Link to="/">목록으로</Link>
      </section>

      {/* Comment */}
      <Comments postId={postId} onCommentCountChange={updateCommentCount} />
    </main>
  )
}

export default PostDetailPage
