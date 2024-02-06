import { useRef } from 'react'

import Blog from './Blog'
import CreateForm from './CreateForm'
import Toggleable from './Toggleable'

import blogsService from '../services/blogsService'

const BlogsSection = ({blogs, setBlogs, user, notify}) => {
  const createFormRef = useRef()

  const createBlog = async (title, author, url) => {
    try {
      const newBlog = await blogsService.create({title, author, url}, user.token)
      setBlogs(blogs.concat(newBlog))
      createFormRef.current.toggleDisplay()
      notify(`${newBlog.title} by ${newBlog.author} added!`, 'green')
    } catch (error) {
      notify(error.response.data.error, 'red')
    }
  }

  return (
    <section>
      <h2><i>Blogs</i></h2>
      {user && 
        <>
          <Toggleable showLabel='+ New' hideLabel="Cancel" ref={createFormRef}>
            <CreateForm 
              blogs={blogs} 
              setBlogs={setBlogs}
              token={user.token} 
              notify={notify} 
              createBlog={createBlog} />
          </Toggleable>
          <br />
        </>
      }
      <div>{blogs.map(b => <Blog blog={b} key={b.id} />)}</div>
    </section>
  )
}

export default BlogsSection