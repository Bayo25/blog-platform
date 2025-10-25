import { useEffect, useState } from "react"
import axios from 'axios'
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

const Home = () => {
  const [post, setPost] = useState([])
  const [error, setError] = useState(null)

  const blogData = async () => {
      try {
        const BlogResponse = await axios.get('https://jsonplaceholder.typicode.com/posts') 
        setPost(BlogResponse.data)
        localStorage.setItem('formData', JSON.stringify(BlogResponse.data))
        // console.log(BlogResponse.data)
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
      console.log(typeof(data))
      // const reverseObject = (obj) => Object.fromEntries(Object.entries(obj).reverse());
      setPost(data.reverse())
    }
  }, [])

  return (    
    <main>
      <NavBar />
      {post.length > 0 ? (
        post.map((data, id) => (
          <section key={data.id} className="p-2 border-b">
            <Link to={`/blog-details/${data.id}`}>
              <h2>{data.id}</h2>
              <h2>{data.title}</h2>
            </Link>
            <p>{data.body}</p>
          </section>
        ))
      ): (
        <p>Loading...</p>
      )}
      <Footer />
    </main>
  )
}

export default Home