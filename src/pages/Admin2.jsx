import { useEffect, useState } from "react"
import ConfirmDelete from "../components/ConfirmDelete"
import Button from "../components/Button"
import { Link } from "react-router-dom"

const Admin = () => {
  const [post, setPost] = useState([])
  const [open, setOpen] = useState(false)
  const [deleteData, setDeleteData] = useState({})


  const getPostData = () => {
    const blogPostData = JSON.parse(localStorage.getItem("formData"))
    setPost(blogPostData.reverse())
    // console.log(blogPostData)
    // console.log('get data from db')
  } 

  useEffect(() => {
    getPostData()
  }, [])

  const deletePost = (id) => {
    const existingPost = JSON.parse(localStorage.getItem('formData'))
    const newPostData = existingPost.filter((post) => post.id !== id)
    setPost(newPostData)
    localStorage.setItem('formData', JSON.stringify(newPostData))
    // setDeleteData(newPostData)
    setOpen(false)
  }

  const openDelete = (data) => {
    setDeleteData(data)
    setOpen(true)
  }

  return (
  <>
    <h1 className="text-3xl font-bold text-center m-10">BLOG POST DATA TABLE</h1>
    <table className="w-full table-fixed border-collapse">
      <thead className="bg-blue-300">
        <tr className="border-b">
          <th className="w-1/12 p-3 text-center">ID</th>
          <th className="w-3/12 p-3 text-center">Title</th>
          <th className="w-5/12 p-3 text-center">Body</th>
          <th className="w-3/12 p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>

      {post.slice(0, 15).map((data, id) => (
          <tr key={id} className="border-b hover:bg-gray-50">
            <td className="p-3">{data.id}</td>

            <td className="p-3 break-words">
              {data.title}
            </td>

            <td className="p-3 break-words">
              {data.body}
            </td>

            <td className="p-3">
              <div className="flex items-center gap-2">
                <Link 
                  to={`/blog-details/${data.id}`}
                  state={{title: data.title, body: data.body}}
                >
                  <Button className="border-none" label="View" variant="primary" />
                </Link>

                <Link 
                  to={`/edit-blog/${data.id}`}
                  state={{title: data.title, body: data.body, id: data.id, uniqueKey: data.uniqueKey}}
                >
                  <Button label="Edit" variant="success" />
                </Link>

                <Button onClick={() => openDelete(data)} label="Delete" variant="danger" />
              </div>
            </td>
          </tr>
      ))}
      </tbody>  
    </table>

    <ConfirmDelete 
      open={open}
      closeDeletePost={() => setOpen(false)}
      postId={deleteData.id}
      deleteFunction={()=>deletePost(deleteData.id)}
    />
  </>
);

}

export default Admin
