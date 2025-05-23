import { Link } from 'react-router-dom'
import { formatDate } from '../utils/features'
import { useCallback, useEffect, useState } from 'react'
import { commentsData } from '../mocks/data'

export const Comments = ({ postId, onCommentCountChange }) => {
  const username = '작성자1'

  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [editState, setEditState] = useState({ id: null, content: '' })

  const fetchComments = useCallback(async () => {
    try {
      //  const response = await getComments(postId)
      // 임시
      setComments(commentsData.filter(comment => comment.postId === Number(postId)))
      // 댓글 수를 부모 컴포넌트에 전달
      if (onCommentCountChange) {
        onCommentCountChange(commentsData.length)
      }
    } catch (error) {
      console.error('댓글 목록 조회 실패:', error)
      alert('댓글 목록 조회에 실패했습니다.')
    }
  }, [postId, onCommentCountChange])

  useEffect(() => {
    fetchComments()
  }, []) // 임시

  const handleSubmit = async e => {
    e.preventDefault()
    if (!newComment.trim()) {
      alert('댓글을 입력하세요')
      return
    }

    try {
      setIsLoading(true)
      const commentData = {
        content: newComment,
        author: username,
        postId,
        _id: Date.now().toString(), // 임시 고유 ID
        createdAt: new Date().toISOString(),
      }

      //   const response = await createComment(commentData)
      //   const updatedComments = [response, ...comments]
      const updatedComments = [commentData, ...comments]
      setComments(updatedComments)
      setNewComment('')

      // 댓글이 추가되면 댓글 수 업데이트
      if (onCommentCountChange) {
        onCommentCountChange(updatedComments.length)
      }
    } catch (error) {
      console.error('댓글 등록 실패:', error)
      alert('댓글 등록에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async commentId => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return

    try {
      setIsLoading(true)
      //   await deleteComment(commentId)
      const updatedComments = comments.filter(comment => comment._id !== commentId)
      setComments(updatedComments)

      // 댓글이 삭제되면 댓글 수 업데이트
      if (onCommentCountChange) {
        onCommentCountChange(updatedComments.length)
      }
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
      alert('댓글 삭제에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditMode = comment => setEditState({ id: comment._id, content: comment.content })
  const handleCancelEdit = () => setEditState({ id: null, content: '' })
  const handleUpdateComment = async commentId => {
    if (!editState.content.trim()) {
      alert('댓글 내용을 입력하세요')
      return
    }

    try {
      setIsLoading(true)
      //   await updateComment(commentId, editState.content)

      setComments(prevComments =>
        prevComments.map(comment =>
          comment._id === commentId ? { ...comment, content: editState.content } : comment
        )
      )
      handleCancelEdit()
    } catch (error) {
      console.error('댓글 수정 실패:', error)
      alert('댓글 수정에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderCommentItem = comment => {
    const isEditing = editState.id === comment._id
    const isAuthor = username === comment.author

    return (
      <li key={comment._id} className="py-2 border-b border-dotted border-gray-300">
        <div className="text-xs flex flex-wrap justify-between">
          <p className="text-dodgerblue font-bold py-1 pr-4 pl-0 hover:text-blue-800">
            <Link to={`/userpage/${comment.author}`}> {comment.author}</Link>
          </p>
          <p className="text-[#999]">{formatDate(comment.createdAt)}</p>
        </div>

        {isEditing ? (
          <textarea
            value={editState.content}
            onChange={e => setEditState({ ...editState, content: e.target.value })}
            className="w-full text-xs mt-2 px-4 py-2 resize-none border border-gray-300 rounded-md outline-none"
            disabled={isLoading}
          />
        ) : (
          <p className="w-full text-xs mt-2">{comment.content}</p>
        )}

        {isEditing ? (
          <div className="flex justify-end gap-2">
            <button
              onClick={() => handleUpdateComment(comment._id)}
              disabled={isLoading}
              className="cursor-pointer text-xs px-3 py-1 rounded-md"
            >
              수정완료
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="cursor-pointer text-xs px-3 py-1 rounded-md"
            >
              취소
            </button>
          </div>
        ) : (
          isAuthor && (
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleEditMode(comment)}
                className="cursor-pointer text-xs px-3 py-1 rounded-md"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(comment._id)}
                className="cursor-pointer text-xs px-3 py-1 rounded-md"
              >
                삭제
              </button>
            </div>
          )
        )}
      </li>
    )
  }

  return (
    <section className="my-2">
      {username ? (
        <form className="flex justify-between items-center gap-2 py-2" onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            disabled={isLoading}
            className="flex-1 px-4 py-2 resize-none border border-gray-300 rounded-md outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer px-4 py-3 rounded-md bg-violet-300 text-gray-700 text-sm"
          >
            {isLoading ? '등록 중...' : '댓글 등록'}
          </button>
        </form>
      ) : (
        <p className="px-2 py-4 rounded-2xl text-center bg-[#eaeaea] my-4">
          댓글을 작성하려면 <Link to="/login">로그인이 필요합니다.</Link>
        </p>
      )}

      <ul>
        {comments.length > 0 ? (
          comments.map(renderCommentItem)
        ) : (
          <li className="py-2 pb-4 border-b border-dotted border-gray-300">
            <p className="w-full text-xs">등록된 댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
          </li>
        )}
      </ul>
    </section>
  )
}
