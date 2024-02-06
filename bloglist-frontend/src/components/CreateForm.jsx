import { useState } from "react"

import blogsService from "../services/blogsService"

const CreateForm = ({blogs, setBlogs, token, notify}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [errorMsg, setErrorMsg] = useState(null)

  const handleCreate = async (e) => {
    e.preventDefault()
    console.log('creating', title, author, url)

    try {
      const newBlog = await blogsService.create({title, author, url}, token)
      setBlogs(blogs.concat(newBlog))
      notify(`${newBlog.title} by ${newBlog.author} added!`, 'green')
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.log(error.response.data.error)
      setErrorMsg(error.response.data.error)
      setTimeout(() => {
        setErrorMsg(null)
      }, 3000)
    }
  }

  return (
    <section>
      <h2><i>Add new blog</i></h2>
      <form onSubmit={handleCreate}>
        Title:<input 
          type='text'
          value={title}
          name="title"
          onChange={({target}) => setTitle(target.value)}
        /><br />
        Author:<input 
          type='text'
          value={author}
          name="author"
          onChange={({target}) => setAuthor(target.value)}
        /><br />
        URL:<input 
          type='url'
          value={url}
          name="url"
          onChange={({target}) => setUrl(target.value)}
        />
        <button type="submit">Add</button>
        {errorMsg && <p style={{color: 'red'}}>{errorMsg}</p>}
      </form>
    </section>
  )
}

export default CreateForm