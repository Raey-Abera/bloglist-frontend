// import React from 'react'
import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // //handleSubmitBlog
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      likes: 0,
      title: title,
      author: author,
      url: url
    })
    // setNewBlog('')
  }
  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleChangeUrl = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <label for='Title'>
          Title:
          <input
            value={title}
            onChange={handleChangeTitle}
          />
        </label>
        <label for='Author'>
          Author:
          <input
            value={author}
            onChange={handleChangeAuthor}
          />
        </label>
        <label for='URL'>
          URL:
          <input
            value={url}
            onChange={handleChangeUrl}
          />
        </label>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
