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

  

  return (
    <>
      <h1>Blogs app</h1>

      {user && <p>Logged in as {'user.name'}</p>}
      {user && <BlogsSection blogs={blogs} />}

      {!user && <Login setUser={setUser} />}
    </>
  )
}

export default App