const Blog = ({ blog }) => {
  return (
    <li><a href={blog.url}>{blog.title}</a> by {blog.author}</li>
  )
}

export default Blog