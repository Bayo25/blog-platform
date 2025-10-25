import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import CreateBlog from './pages/CreateBlog'
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import EditBlog from './pages/EditBlog'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/blog-details/:id' element={<PostDetails />} />
        <Route path='/edit-blog' element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
