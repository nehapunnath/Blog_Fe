import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addBlogApi } from '../services/allApis';
import { useEffect } from 'react';
import { addblogContext } from '../context/contextApi';
import { useNavigate } from 'react-router-dom';

function AddBlog() {

  const [blog, setBlog] = useState({
    title: "", shortdescrptn: "", content: "", category: "", image: ""
  })

  const nav = useNavigate()

  const [preview, setPreview] = useState("")

  useEffect(() => {
    if (blog.image) {
      setPreview(URL.createObjectURL(blog.image))
    }
    else {
      setPreview("")
    }
  }, [blog.image])

  // const { addblog, setaddBlog } = useContext(addblogContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(blog)

    const { title, shortdescrptn, content, category, image } = blog
    if (!title || !shortdescrptn || !content || !category || !image || category === "") {
      toast.warning("Enter valid Inputs!!")
    }
    else if (image.type != 'image/jpg' && image.type != 'image/jpeg' && image.type != 'image/png') {
      toast.warning("Invalid File Format....Image should be either jpg,jpeg or png")
    }
    else {
      try {
        const result = await addBlogApi(blog)
        console.log(result)
        if (result.status == 200) {
          toast.success("Blog Added !!!")
          setBlog({
            title: "", shortdescrptn: "", content: "", category: "", image: ""
          })
          setPreview("")
          // setaddBlog(result)
          nav('/myblog')
        }
        else {
          toast.error("Blog Adding Failed!!!")
        }
      }
      catch (err) {
        console.error("Axios Error:", err);

        if (err.response) {
          console.error("Backend error response:", err.response.data);
          toast.error("Server Error: " + err.response.data?.message || "Something went wrong.");
        } else if (err.request) {
          console.error("No response received:", err.request);
          toast.error("No response from server.");
        } else {
          console.error("Axios error setup issue:", err.message);
          toast.error("Request setup failed.");
        }
      }
    }
  }
  return (
    <>

      <div className="container-fluid">
        <div className="container-fluid m-4 " >

          <Link to="/myblog" className="btn btn-outline-secondary rounded-circle">
            <i className="fa-solid fa-arrow-left text-dark"></i>
          </Link>


        </div>



        <h2 className="fw-bold mb-4 m-4">Create a New Blog</h2>

        <div className="container mt-2 p-3 mb-4 border shadow">

          <form>
            <div className="mb-3 d-flex justify-content-center align-items-center border" style={{ height: '400px' }}>
              <label htmlFor="f1">
                <input type="file" id="f1" style={{ display: 'none' }} onChange={(e) => setBlog({ ...blog, image: e.target.files[0] })} />
                <img
                  src={preview ? preview : "https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-80-512.png"}
                  alt="img"
                  className='img-fluid p-3'
                  style={{ width: '800px', height: '400px', cursor: 'pointer' }}
                />
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Blog Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your blog title" onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                value={blog.title}
              />
            </div>


            <div className="mb-3">
              <label className="form-label fw-bold">Short Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Add a brief description" onChange={(e) => setBlog({ ...blog, shortdescrptn: e.target.value })}
                value={blog.shortdescrptn}
              />
            </div>


            <div className="mb-3">
              <label className="form-label fw-bold">Blog Content</label>
              <textarea onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                className="form-control"
                rows="8"
                placeholder="Write your blog content here..."
                value={blog.content}
              ></textarea>
            </div>


            <div className="mb-3">
              <label className="form-label fw-bold" >Category</label>
              <select className="form-select" onChange={(e) => setBlog({ ...blog, category: e.target.value })} value={blog.category}>
                <option value="" selected disabled>Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Travel" >Travel</option>
                <option value="Lifestyle" >Lifestyle</option>
                <option value="Education" >Education</option>
                <option value="Others">Others</option>
              </select>
            </div>


            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Publish Blog</button>
          </form>
        </div>


      </div>





    </>
  )
}

export default AddBlog