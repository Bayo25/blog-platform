import React, { useEffect, useState } from "react"
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const EditBlog =() => {
  const [formData, SetFormData] = useState({
    title: "",
    body: "",
    id: "",
    uniqueKey: ""
  })

  const navigate = useNavigate()

  const { title, body, id, uniqueKey } = useLocation().state
  // console.log(uniqueKey)

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormData(prev => ({ ...prev, [name]: value }));
  };

  const editNofitication = () => {
    toast("Blog post updated successfully!")
  }


  const handlePostUpdate = (e) => {
    e.preventDefault()
    
    const postData = JSON.parse(localStorage.getItem('formData') || '[]')
    
    const index = postData.findIndex(blog => blog.uniqueKey === formData.uniqueKey)
    
    if (index !== -1) {
      postData[index] = {
        ...postData[index],
        title: formData.title,
        body: formData.body
      }
      
      localStorage.setItem('formData', JSON.stringify(postData))
      editNofitication()
      
      // alert('Blog post updated successfully!')
      navigate('/home')
    } else {
      alert('Post not found!')
    }
    
    console.log('Index found:', index)
    console.log('Unique Key:', formData.uniqueKey)
  }

  useEffect(() => {
    if (title && body && id && uniqueKey) {
      SetFormData({ title, body, id, uniqueKey })
    console.log('Unique key from use effect:', uniqueKey)

    }
    console.log(body,id)
  }, [])

  return (
    <>
      {/* <h1>{title}</h1>
      <p>{body}</p> */}
      <section className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handlePostUpdate}
          className="w-[70%] p-10 rounded-2xl flex flex-col items-center space-y-8"
        >
          <h2 className="text-3xl font-semibold text-blue-800 mb-4">
            Update Blog Post
          </h2>

          <div className="w-full">
            <label
              htmlFor="title"
              className="block text-blue-900 font-medium mb-2 text-lg"
            >
              Title
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your title..."
              className="w-full h-14 px-5 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 text-gray-800 text-base"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="body"
              className="block text-blue-900 font-medium mb-2 text-lg"
            >
              Blog Post
            </label>
            <textarea
              name="body"
              rows="10"
              value={formData.body}
              onChange={handleChange}
              placeholder="Write your post here..."
              className="w-full h-60 px-5 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none text-gray-800 text-base"
            />
          </div>

            <button
              className="w-full bg-blue-600 text-white text-center font-semibold py-4 rounded-lg hover:bg-blue-700 transition duration-200 text-lg"
              type="submit"
            >
              Submit
            </button>
        </form>
      </section>
      <Footer />
    </>
  )
}

export default EditBlog