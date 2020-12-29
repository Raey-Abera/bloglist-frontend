import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleViewChange = () => {
    setShowAll(true)
    console.log('blog', blog)
  }
  const handleHideChange = () => {
    setShowAll(false)
    console.log('blog', blog)
  }

  const addLike = () => {
    let copyOfLike = likes;
    setLikes(copyOfLike + 1)
    console.log("likes", likes)
  }

  const handleUpdateLikes = (event) => {
    addLike()
    updateLikes(
      blog.id,
      {
        likes: likes,
        // likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
    )

  }

  const handleDelete = () => {
    deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      { showAll
        ?
        <div>
          <p>Title: {blog.title} </p>
          <p>Author: {blog.author} </p>
          <p>Url: {blog.url} </p>
          <p>Likes: {blog.likes} <button onClick={handleUpdateLikes}>Like</button> </p>
          <button onClick={handleHideChange}>Hide</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
        :
        <div>
          {blog.title} {blog.author}
          <button onClick={handleViewChange}>view</button>
        </div>
      }
    </div>
  )
}

export default Blog
