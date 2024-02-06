import { useRef } from 'react'

import Blog from './Blog'
import CreateForm from './CreateForm'
import Toggleable from './Toggleable'

import blogsService from '../services/blogsService'

const BlogsSection = ({blogs, setBlogs, user, notify}) => {
  const createFormRef = useRef()

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogsService.create(blog, user.token)
      setBlogs(await blogsService.getAll())
      createFormRef.current.toggleDisplay()
      notify(`${newBlog.title} by ${newBlog.author} added!`, 'green')
    } catch (error) {
      notify(error.response.data.error, 'red')
    }
  }

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogsService.update({ ...blog, user: blog.user.id }, user.token)
      const blogsCopy = blogs
      setBlogs(blogsCopy.map(b => b.id !== blog.id ? b : blog))
      console.log(blogsCopy)
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
      <div>{blogs.map(b => <Blog 
        blog={b}
        key={b.id}
        updateBlog={updateBlog}
      />)}</div>
    </section>
  )
}

export default BlogsSection