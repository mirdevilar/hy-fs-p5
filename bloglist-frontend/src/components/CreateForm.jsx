import { useState } from "react"

import blogsService from "../services/blogsService"

const CreateForm = ({createBlog}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (e) => {
    e.preventDefault()

    createBlog({title, author, url})

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <section>
      <h3>Add new blog</h3>
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
        /><br />
        <button type="submit">Add</button>
      </form>
    </section>
  )
}

export default CreateForm