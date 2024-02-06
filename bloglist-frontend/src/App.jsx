import { useEffect, useState } from 'react'

import BlogsSection from './components/BlogsSection'
import Login from './components/Login'

import blogsService from './services/blogsService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)


  useEffect(() => {
    //setUser({username: "poop"})
    blogsService.getAll()
      .then(initialBlogs => {setBlogs(initialBlogs)})
  }, [])

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  })

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  return (
    <>
      <h1><i>Blogs app</i></h1>

      {user && <p>Logged in as <b>{user.username}</b> <button onClick={handleLogout} >Log out</button></p>}
      {user && <BlogsSection blogs={blogs} />}

      {!user && <Login setUser={setUser} />}
    </>
  )
}

export default App