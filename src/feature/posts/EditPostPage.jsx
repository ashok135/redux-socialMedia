// Original uploaded file reference: /mnt/data/0a6737db-8ddf-41da-8f23-a35394f09c4b.png
// Minor adjustments only — kept your structure and action names (upadatePost) as-is.
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postData, selectPostById, upadatePost,deletePost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

function EditPostPage() {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const post = useSelector((state) => selectPostById(state, Number(postId)))
  const users = useSelector(selectAllUsers)

  // local form state (do not rely directly on post object for controlled inputs)
  const [edit, setEdit] = useState({ title: '', body: '', userId: '' })
  const [userId, setUserId] = useState('')

  // populate local state when post becomes available
  useEffect(() => {
    if (post) {
      setEdit({
        title: post.title ?? '',
        body: post.body ?? '',
        userId: post.userId ? String(post.userId) : ''
      })
      setUserId(post.userId ? String(post.userId) : '')
    }
  }, [post])

  // handlers
  const onTitleChanged = (e) => setEdit((s) => ({ ...s, title: e.target.value }))
  const onBodyChanged = (e) => setEdit((s) => ({ ...s, body: e.target.value }))
  const onAuthorChanged = (e) => {
    setUserId(e.target.value)
    setEdit((s) => ({ ...s, userId: e.target.value }))
  }

  const userOptions = () =>
    users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))

  const onPostUpdate = (e) => {
    e.preventDefault()
    if (!post) return

    // build payload using edit state and selected userId
    const payload = {
      id: post.id,
      title: edit.title,
      body: edit.body,
      userId: Number(userId || edit.userId)
    }

    // dispatch the update action using the dispatch instance
    dispatch(upadatePost(payload))

    // navigate back to single post view
    navigate(`/post/${post.id}`)
  }
  function onDelete (){
    dispatch(deletePost(post.id))
    navigate("/")
  }

  if (!post) return <div>No post found</div>

  return (
    <div>
      <div>Edit Post Here</div>
      <form onSubmit={onPostUpdate}>
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id="postTitle"
          name="title"
          value={edit.title}
          required
          onChange={onTitleChanged}
        />
        <br />

        <label htmlFor="postContent">Post Content</label>
        <input
          type="text"
          id="postContent"
          name="body"
          required
          value={edit.body}
          onChange={onBodyChanged}
        />
        <br />

        <label htmlFor="userId">Select the author</label>
        <select id="userId" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions()}
        </select>
        <br />

        <button type="submit">submit post</button>
      </form>

      <button onClick={onDelete}>Delete post</button>
    </div>
  )
}

export default EditPostPage
