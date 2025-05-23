import { Link, useNavigate } from 'react-router-dom'
import { formatDate } from '../utils/features'

export default function PostCard({ post }) {
  const navigate = useNavigate()

  return (
    <article
      className="group border-b border-dotted border-[#e3e3e3] cursor-pointer rounded-2xl overflow-hidden shadow-md transition duration-300 hover:shadow-xl"
      onClick={() => navigate(`/detail/${post.id}`)}
    >
      <div className="overflow-hidden relative pt-[50%]">
        <img
          src="https://picsum.photos/600/300"
          alt={post.title}
          className="absolute top-0 w-full h-full object-cover transition-all duration-200 ease-in-out group-hover:scale-110"
        />
      </div>
      <h3 className="px-4 pt-4 pb-0 text-[1.2rem] leading-8 text-[#666] whitespace-nowrap overflow-hidden text-ellipsis ">
        {post.title}
      </h3>

      <div className="flex items-center justify-between text-[0.8rem] px-4">
        <p>
          <Link
            to={`/mypage`}
            className="text-dodgerblue font-bold py-1 pr-4 pl-0 hover:text-blue-800"
          >
            any
          </Link>
          <time className="text-[#999] ml-2">{formatDate(post.createdAt)}</time>
        </p>
        <p>
          <span>❤️</span> <span>{post.likes.length}</span> <span>💬</span>{' '}
          <span>{post.commentCount}</span>
        </p>
      </div>
      <p className="px-4 text-[0.8rem] leading-[1.25rem] text-black overflow-hidden mb-4 h-[60px] clamp-3">
        {post.summary}
      </p>
    </article>
  )
}
