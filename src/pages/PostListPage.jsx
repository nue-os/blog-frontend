import { useCallback, useEffect, useRef, useState } from 'react'
import PostCard from '../components/PostCard'

const PostListPage = () => {
  const [postList, setPostList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const listRef = useRef(null)
  const observer = useRef()

  // 마지막 게시물 요소를 감지하는 ref 콜백
  const lastPostElementRef = useCallback(
    node => {
      if (isLoading || !node) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1)
        }
      })

      observer.current.observe(node)
    },
    [isLoading, hasMore]
  )

  useEffect(() => {
    const fetchPostList = () => {
      try {
        if (page > 0) setIsLoading(true)
        // 임시
        const data = {
          posts: [
            {
              id: 1,
              title: '제목1',
              summary: '내용1',
              author: '작성자1',
              createdAt: '2025-05-22T00:00:00Z',
            },
          ],
        }
        setPostList(prev => (page === 0 ? data.posts : [...prev, ...data.posts]))
        setHasMore(false)
      } catch (err) {
        console.error(err)
        setError('글 목록을 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchPostList()
  }, [page])

  return (
    <main className="main">
      <h2 className="heading2">글 목록</h2>
      {error && <p>{error}</p>}
      {isLoading && page === 0 ? (
        <p>로딩 중 ...</p>
      ) : postList.length === 0 ? (
        <p>첫번 째 글의 주인공이 되어주세요.</p>
      ) : (
        <ul ref={listRef} className="flex flex-col gap-8">
          {postList.map((post, index) => (
            <li key={post.id} ref={index === postList.length - 1 ? lastPostElementRef : null}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default PostListPage
