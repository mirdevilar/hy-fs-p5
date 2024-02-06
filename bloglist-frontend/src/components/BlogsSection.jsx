import Blog from './Blog'

const BlogSection = ({blogs}) => (
  <section>
    <h3>Blogs</h3>
    <ul>{blogs.map(b => <Blog blog={b} key={b.id} />)}</ul>
  </section>
)

export default BlogSection