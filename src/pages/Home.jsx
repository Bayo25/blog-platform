import { useEffect, useState } from "react"
import axios from 'axios'
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { Link ,useNavigate } from "react-router-dom"
import Button from "../components/Button"


const Home = () => {
  const [post, setPost] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const blogData = async () => {
      try {
        const BlogResponse = await axios.get('https://jsonplaceholder.typicode.com/posts') 
        const postsWithUniqueKey = BlogResponse.data.map(post => ({
        ...post,
        uniqueKey: `post-${post.id}-${Date.now()}`
      }))
        setPost(postsWithUniqueKey)
        localStorage.setItem('formData', JSON.stringify(postsWithUniqueKey))
      } catch (err) {
        setError(err)
      }

    }

  useEffect(() => {
    const localStorageData = localStorage.getItem("formData")
    
    if (!localStorageData) {
      blogData()
    } else {
      const data = JSON.parse(localStorageData)
      // console.log(typeof(data))
      setPost(data.reverse())
      console.log('this is the entire post:',post)
    }
  }, [])

  const handleDeletePost = (data) => {
    console.log('Delete button clicked for post:', data)
    
    const confirmDelete = window.confirm("Are you sure you want to delete this post?")
    console.log('User confirmed delete:', confirmDelete)
    
    if (confirmDelete) {
      const blogPostData = JSON.parse(localStorage.getItem('formData') || '[]')
      console.log('All posts before deletion:', blogPostData)
      console.log('Post to delete - uniqueKey:', data.uniqueKey)
      
      const updatedPosts = blogPostData.filter((post) => post.uniqueKey !== data.uniqueKey)
      console.log('Posts after deletion:', updatedPosts)
      console.log('Number of posts removed:', blogPostData.length - updatedPosts.length)
      
      localStorage.setItem('formData', JSON.stringify(updatedPosts))
      setPost(updatedPosts)
      
      alert('Post deleted successfully!')
    } else {
      console.log('Delete cancelled by user')
    }
  }

  return ( 
    <main>
      <NavBar />
        <div className="grid grid-cols-3 gap-3 m-10">
          {post.length > 0 ? (
            post.slice(0, 12).map((data, id,) => (
              <div key={id} className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition-all">
                <Link 
                  to={`/blog-details/${data.id}`}
                  state={{title: data.title, body: data.body}}
                >
                  {/* <h2>{data.id}</h2> */}
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{data.title}</h2>
                </Link>
                <p className="text-gray-600 text-sm flex-1 line-clamp-3">{data.body}</p>
                <div className="flex justify-between mt-4">
                    <Link 
                      to={'/edit-blog'}
                      state={{title:data.title, body: data.body, id: data.id, uniqueKey: data.uniqueKey}}
                    >
                      <Button label="Edit Blog" variant="success"/>
                    </Link>

                    {/* <Link to={'/delete-blog/:id'}> */}
                      <Button label="Delete Post" variant="danger" onClick={() => handleDeletePost(data) }/>
                    {/* </Link> */}
                  </div>
                </div> 
            ))
          ): (
            <p className="col-span-3 text-center text-gray-600 text-lg">Loading...</p>
          )}
        </div>
      <Footer />
    </main>
  )
}

export default Home