import { useCallback, useEffect, useRef, useState } from 'react'
import PostCard from '../components/PostCard'
import { getPostList } from '../apis/postApi'

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
    const fetchPostList = async () => {
      try {
        // 페이지가 0보다 크면 추가 데이터 로딩
        if (page > 0) setIsLoading(true)

        const data = await getPostList(page)
        setPostList(prev => (page === 0 ? data.posts : [...prev, ...data.posts]))
        setHasMore(data.hasMore)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPostList()
  }, [page])

  return (
    <main>
      <h2 hidden>글 목록</h2>
      <div className="py-3"></div>
      {error && <p>{error}</p>}
      {isLoading && page === 0 ? (
        <p>로딩 중 ...</p>
      ) : postList.length === 0 ? (
        <p>첫번 째 글의 주인공이 되어주세요.</p>
      ) : (
        <ul ref={listRef} className="flex flex-col gap-8">
          {postList.map((post, index) => (
            <li key={post._id} ref={index === postList.length - 1 ? lastPostElementRef : null}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default PostListPage
