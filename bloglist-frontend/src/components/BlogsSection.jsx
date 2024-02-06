import Blog from './Blog'

const BlogsSection = ({blogs}) => (
  <section>
    <h2><i>Blogs</i></h2>
    <ul>{blogs.map(b => <Blog blog={b} key={b.id} />)}</ul>
  </section>
)

export default BlogsSection