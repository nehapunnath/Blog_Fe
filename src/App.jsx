import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import AdminAuth from './pages/AdminAuth'
import Dashboard from './pages/Dashboard'
import BlogPage from './pages/BlogPage'
import Header from './components/Header'
import MyBlogs from './pages/MyBlogs'
import EditBlog from './components/EditBlog'
import BookMark from './pages/BookMark'
import Notification from './pages/Notification'
import Profile from './pages/Profile'
import AdminDash from './pages/Admin/AdminDash'
import { ToastContainer } from 'react-toastify'
import AddBlog from './components/AddBlog'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminBlogs from './pages/Admin/AdminBlogs'
import AdminTBlogs from './pages/Admin/AdminTBlogs'
import Category from './pages/Category'
import AdminBlogPg from './pages/Admin/AdminBlogPg'
import AdminTtLikes from './pages/Admin/AdminTtLikes'
import ReportedBlogs from './pages/Admin/ReportedBlogs'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminMssg from './pages/Admin/AdminMssg'


function App() {
  const [count, setCount] = useState(0)
      
  
  

  return (
    <>
    {/* <Header/> */}
 
      <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/dash' element={<Dashboard/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/adminauth' element={<AdminAuth/>}/>
      <Route path='/blogpg/:id' element={<BlogPage/>}/>
      <Route path='/myblog' element={<MyBlogs/>}/>
      <Route path='/addblog' element={<AddBlog/>}/>
      <Route path='/edit/:id' element={<EditBlog/>}/>
      <Route path='/bookmark' element={<BookMark/>}/>
      <Route path='/notification' element={<Notification/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/category' element={<Category/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      



      <Route path='/admin/dash' element={<AdminDash/>}/>
      <Route path='/admin/user' element={<AdminUsers/>}/>
      <Route path='/admin/blogs' element={<AdminBlogs/>}/>
      <Route path='/admin/totalblogs' element={<AdminTBlogs/>}/>
      <Route path='/admin/blogpg/:id' element={<AdminBlogPg/>}/>
      <Route path='/admin/likes' element={<AdminTtLikes/>}/>
      <Route path='/admin/reported' element={<ReportedBlogs/>}/>
      <Route path='/admin/messages' element={<AdminMssg/>}/>

    </Routes>

    <ToastContainer/>


    

     
    </>
  )
}

export default App
