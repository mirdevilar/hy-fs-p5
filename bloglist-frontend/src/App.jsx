import { useEffect, useState } from 'react'

import BlogsSection from './components/BlogsSection'
import Login from './components/Login'

import blogsService from './services/blogsService'
import CreateForm from './components/CreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogsService.getAll()
      .then(initialBlogs => {setBlogs(initialBlogs)})
  }, [])

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const notify = (msg, color) => {
    setNotification({msg, color})
    setTimeout(() => {
      setNotification(null)
    }, 3000);
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  return (
    <>
      <h1><i>Blogs app</i></h1>

      {notification && <p style={{color: notification.color}}>{notification.msg}</p>}
      {user && <p>Logged in as <b>{user.username}</b> <button onClick={handleLogout} >Log out</button></p>}
      {user && <CreateForm blogs={blogs} setBlogs={setBlogs} token={user.token} notify={notify} />}
      {user && <BlogsSection blogs={blogs} />}

      {!user && <Login setUser={setUser} />}
    </>
  )
}

export default App