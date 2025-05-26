import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import QuillEditor from '../components/QuillEditor'
import Input from '../components/Input'
import useUserStore from '../store/useUserStore'
import { getPostDetail, updatePost } from '../apis/postApi'

export const EditePost = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const { userId, id } = useUserStore()

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const [currentImage, setCurrentImage] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // 사용자 정보가 없으면 로그인 페이지로 리디렉션
  useEffect(() => {
    if (id === null) return
    if (!userId || !id) {
      navigate('/login')
    }
  }, [userId, id, navigate])

  // 글 정보 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true)

        const postData = await getPostDetail(postId)

        // 현재 사용자와 글 작성자가 다르면 접근 제한
        if (postData.author !== id) {
          setError('자신의 글만 수정할 수 있습니다')
          navigate('/')
          return
        }

        // 글 데이터 설정
        setTitle(postData.title)
        setSummary(postData.summary)
        setContent(postData.content)

        // 이미지가 있으면 이미지 URL 설정
        if (postData.cover) {
          setCurrentImage(`${import.meta.env.VITE_BACK_URL}/${postData.cover}`)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (userId && id) {
      fetchPost()
    }
  }, [userId, id, postId, navigate])

  const handleContentChange = content => setContent(content)

  const handleSubmit = async e => {
    e.preventDefault()

    if (!title || !summary || !content) {
      setError('모든 필드를 입력해주세요')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // FormData 생성
      const formData = new FormData()
      formData.set('title', title)
      formData.set('summary', summary)
      formData.set('content', content)

      // 새 파일이 선택된 경우에만 파일 추가
      if (files?.[0]) {
        formData.set('files', files[0])
      }

      // API 호출하여 글 업데이트
      await updatePost(postId, formData)

      // 성공 시 상세 페이지로 이동
      navigate(`/detail/${postId}`)
    } catch (err) {
      setError(err.message || '글 수정에 실패했습니다')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div>글 정보를 불러오는 중...</div>
  }

  return (
    <main>
      <h2>글 수정하기</h2>
      {error && <div className="bg-[#ffebee] text-[#c62828] p-[10px] rounded-md mb-5">{error}</div>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label htmlFor="title">제목</label>
        <Input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          required
        />

        <label htmlFor="summary">요약 내용</label>
        <Input
          type="text"
          id="summary"
          name="summary"
          value={summary}
          onChange={e => setSummary(e.target.value)}
          placeholder="요약내용을 입력해주세요"
          required
        />

        <label htmlFor="files">파일 첨부</label>
        <Input
          type="file"
          id="files"
          name="files"
          accept="image/*"
          onChange={e => {
            setFiles(e.target.files)
            setCurrentImage(null)
          }}
          defaultFileName={currentImage?.split('/').pop()}
        />

        {currentImage && (
          <div className="flex flex-col gap-2">
            <label>현재 이미지</label>
            <div className="overflow-hidden relative pt-[50%]">
              <img
                src={currentImage}
                alt="현재 이미지"
                className="absolute top-0 w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-500 text-center">
              ⚠️ 새 이미지를 업로드하면 기존 이미지는 대체됩니다.
            </p>
          </div>
        )}

        <label htmlFor="content">내용</label>
        <div className="w-full">
          <QuillEditor
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력해주세요"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-5 py-2 text-white rounded cursor-pointer transition-colors duration-300
            ${isSubmitting ? 'bg-violet-200 cursor-not-allowed' : 'bg-violet-400 hover:bg-violet-500'}`}
        >
          {isSubmitting ? '수정 중...' : '수정하기'}
        </button>
      </form>
    </main>
  )
}
