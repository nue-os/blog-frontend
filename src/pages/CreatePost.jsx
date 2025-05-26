import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QuillEditor from '../components/QuillEditor'
import Input from '../components/Input'
import useUserStore from '../store/useUserStore'
import { createPost } from '../apis/postApi'

const CreatePost = () => {
  const navigate = useNavigate()

  const id = useUserStore(state => state.id)

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [files, setFiles] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id === null) return // 로딩 중
    if (!id) {
      navigate('/login')
    }
  }, [id, navigate])

  const handleContentChange = content => setContent(content)

  const handleCreatePost = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (!title || !summary || !content) {
      setIsSubmitting(false)
      setError('모든 필드를 입력해주세요.')
      return
    }

    // 백엔드로 전송할 데이터 생성
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)

    if (files[0]) {
      data.set('files', files[0])
    }

    try {
      await createPost(data)

      setIsSubmitting(false)
      navigate('/')
    } catch (err) {
      console.log(err)
    } finally {
      setIsSubmitting(false)
      setError('')
    }
  }

  return (
    <main>
      <h2>글쓰기</h2>
      {error && <div className="bg-[#ffebee] text-[#c62828] p-[10px] rounded-md mb-5">{error}</div>}
      <form className="flex flex-wrap gap-4" onSubmit={handleCreatePost}>
        <label htmlFor="title">제목</label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-4"
        />
        <label htmlFor="summary">요약내용</label>
        <Input
          type="text"
          id="summary"
          name="summary"
          placeholder="요약내용을 입력해주세요"
          value={summary}
          onChange={e => setSummary(e.target.value)}
          className="w-full p-4"
        />
        <label htmlFor="files">파일</label>
        <Input
          type="file"
          id="files"
          name="files"
          accept="image/*"
          onChange={e => setFiles(e.target.files)}
          className="w-full p-4"
        />
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
          {isSubmitting ? '등록중...' : '등록'}
        </button>
      </form>
    </main>
  )
}

export default CreatePost
