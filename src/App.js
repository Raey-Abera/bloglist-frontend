import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const blogFormRef = useRef()

  // const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // const handleLogOut = async (event) => {
  //   event.preventDefault()
  // }
    
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
    }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  // const handleBlogChange = () => { }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const handleUpdateLikes = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const handleDelete = id => {
    blogService
      .remove(id)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const sortedBlogs = [];
  const sortedNumberOfLikes = blogs.map(blog => blog.likes).sort((a,b) => b-a );
  for(let i = 0; i < sortedNumberOfLikes.length; i++){
    for(let j = 0; j < blogs.length; j++)
    if(blogs[j].likes === sortedNumberOfLikes[i]){
      sortedBlogs.push(blogs[j])
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
            <h2>Blogs</h2>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateLikes={handleUpdateLikes} deleteBlog={handleDelete}/>
          )}

        </div>
      }

    </div>
  )
}

export default App