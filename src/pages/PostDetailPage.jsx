import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { formatDate } from '../utils/features'
import LikeButton from '../components/LikeButton'
import { Comments } from '../components/Comments'

const PostDetailPage = () => {
  const username = ''
  const navigate = useNavigate()

  const { postId } = useParams()
  const [postInfo, setPostInfo] = useState({})
  const [commentCount, setCommentCount] = useState(0)

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        // 임시
        const data = {
          postId: postId,
          title: '제목1',
          summary: '써머리1',
          content: '내용1',
          author: '작성자1',
          createdAt: '2025-05-22T00:00:00Z',
          likes: [1, 2, 3, 4, 5, 6],
        }
        setPostInfo(data)
        setCommentCount(0)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPostDetail()
  }, [postId])

  const handleDeletePost = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        // postId를 이용하여 글을 삭제
        alert('삭제되었습니다.')
        navigate('/')
      } catch (error) {
        console.error('글 삭제 실패:', error)
        alert('삭제에 실패했습니다.')
      }
    }
  }

  // 댓글 수를 업데이트하는 함수
  const updateCommentCount = count => setCommentCount(count)

  return (
    <main>
      <h2>{postInfo?.title}</h2>
      <section>
        <div className="overflow-hidden relative pt-[50%]">
          <img
            src="https://picsum.photos/600/300"
            alt={postInfo?.title}
            className="absolute top-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between items-center gap-8 p-4 text-[0.7rem]">
          <p className="text-dodgerblue font-bold py-1 pr-4 pl-0 hover:text-blue-800">
            <Link to={`/userpage/${postInfo?.author}`}>{postInfo?.author}</Link>
          </p>
          <p className="text-[#999] ml-2 flex-1">{formatDate(postInfo?.createdAt)}</p>
          <p>
            {postInfo && <LikeButton postId={postId} likes={postInfo.likes} />}
            <span className="ml-[10px]">💬 {commentCount}</span>
          </p>
        </div>
        <div className="bg-[#eaeaea] p-4 rounded-[1rem] italic">{postInfo?.summary}</div>
        <div
          className={`p-4 ql-content`}
          dangerouslySetInnerHTML={{ __html: postInfo?.content }}
        ></div>
      </section>

      <section className="py-4 flex gap-4 justify-end border-t border-b border-dotted border-[#e3e3e3]">
        {username === postInfo?.author && (
          <>
            <Link
              to={`/edit/${postId}`}
              className="bg-gray-300 text-sm rounded-[10px] p-4 cursor-pointer transition duration-30 hover:bg-gray-500 hover:text-white"
            >
              수정
            </Link>
            <span
              onClick={handleDeletePost}
              className="bg-gray-300 text-sm rounded-[10px] p-4 cursor-pointer transition duration-300 hover:bg-gray-500 hover:text-white"
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
