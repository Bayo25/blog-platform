import React, { useState } from "react"


const EditBlog =() => {
  const [formData, SetFormData] = useState({
    title: "",
    body: ""
  })

  const handleChange = (e) => {
    e.preventDefault()

    const { key, value } = e.target.value
    SetFormData({...formData, [key]: value })
  } 

  return (
    <form action="" className="">
      <label 
        htmlFor=""
        onChange={handleChange}
      >title</label>
      <input type="text" className="border border-red-500" />

      <label 
        htmlFor=""
        onChange={handleChange}
      >blog post</label>
      <textarea type="textarea" className="border border-red-500"/>

      <button className="border border-blue-500 rounded-full">Submit</button>
    </form>
  )
}

export default EditBlog