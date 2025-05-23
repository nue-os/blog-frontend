// 유저 정보
export const userInfo = {
  username: '작성자1',
  createdAt: new Date().toISOString(),
}

// 유저가 작성한 포스트
export const postsData = [
  {
    _id: 1,
    title: '제목1',
    summary: '써머리1',
    content: '내용1',
    author: '작성자1',
    createdAt: '2025-05-22T00:00:00Z',
    likes: [1, 2, 3],
    commentCount: 2,
  },
  {
    _id: 2,
    title: '제목2',
    summary: '써머리2',
    content: '내용2',
    author: '작성자2',
    createdAt: '2025-05-21T00:00:00Z',
    likes: [4, 5],
    commentCount: 0,
  },
]

// 유저가 작성한 댓글
export const commentsData = [
  {
    _id: 1,
    content: '댓글1',
    author: '작성자1',
    postId: 1,
    createdAt: '2025-05-22T00:00:00Z',
  },
]

// 유저가 좋아요 누른 포스트 ID
export const likesData = [
  {
    _id: 1,
    title: '좋아요한 포스트 1',
    cover: '',
  },
  {
    _id: 2,
    title: '좋아요한 포스트 2',
    cover: '',
  },
  {
    _id: 3,
    title: '좋아요한 포스트 3',
    cover: '',
  },
]
