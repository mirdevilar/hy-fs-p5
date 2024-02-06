import { useState } from "react"

const Blog = ({ blog }) => {
  const [displayDetails, setDisplayDetails] = useState(false)

  const toggleDetails = () => {
    setDisplayDetails(!displayDetails)
  } 

  const getDisplayDetails = () => {
    return displayDetails ?
      'hide' :
      'show'
  }

  const blogStyle = {
    backgroundColor: '#dae2ec',
    marginTop: '10px',
    padding: '5px',
    width: '40%'
  }

  return (
    <div style={blogStyle}>
      <a href={blog.url}>{blog.title}</a> by {blog.author}
      <button onClick={toggleDetails}>{displayDetails ? 'hide' : 'show'}</button>
      {displayDetails &&
        <p>
          Likes: {blog.likes}<button>Like</button><br />
          Uploaded by {blog.user.username}
        </p>
        
        
      }
    </div>
  )
}

export default Blog