import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import base_url from '../services/base_url';
import { UpdateBlog } from '../services/allApis';
import { toast } from 'react-toastify';
// import { editblogContext } from '../context/contextApi';

function EditBlog() {
  const location = useLocation();
  const nav = useNavigate();
  const blog = location.state?.blog;

  const [edtBlog, SetEdtblog] = useState({
    title: "", shortdescrptn: "", content: "", category: "", image: ""
  });

  const [preview, setPreview] = useState("");

  // const {editblog,setEditBlog}=useContext(editblogContext)

  // Redirect or prevent crash if no blog data was passed
  useEffect(() => {
    if (!blog) {
      toast.error("No blog data to edit!");
      nav("/myblog");
    } else {
      SetEdtblog(blog);
    }
  }, [blog, nav]);

  useEffect(() => {
    if (edtBlog.image && typeof edtBlog.image !== 'string') {
      setPreview(URL.createObjectURL(edtBlog.image));
    } else if (edtBlog.image) {
      setPreview(`${base_url}/uploaded/${edtBlog.image}`);
    } else {
      setPreview("");
    }
  }, [edtBlog.image]);

  const handleEdit = async (e) => {
    e.preventDefault(); // prevent form reload
    const { title, shortdescrptn, content, category, image } = edtBlog;

    if (!title || !shortdescrptn || !content || !category || !image || category === "") {
      toast.warning("Enter valid Inputs!!");
    } else if (image.type && image.type !== 'image/jpg' && image.type !== 'image/jpeg' && image.type !== 'image/png') {
      toast.warning("Invalid File Format....Image should be either jpg,jpeg or png");
    } else {
      const result = await UpdateBlog(blog._id, edtBlog);
      if (result.status === 200) {
        toast.success("Blog Updated!!");
        nav('/myblog');
        // setEditBlog(result)
      } else {
        toast.error("Something went wrong...Updating Failed");
      }
    }
  };

  return (
    <>
      <div className="container-fluid mt-3">
        <Link to="/myblog" className="btn btn-outline-secondary rounded-circle">
          <i className="fa-solid fa-arrow-left text-dark"></i>
        </Link>
      </div>

      <h2 className="fw-bold mb-4 m-4">Edit Blog</h2>

      <div className="container mt-2 p-3 border shadow mb-5">
        <form onSubmit={handleEdit}>
          <div className="mb-3 d-flex justify-content-center align-items-center border" style={{ height: '400px' }}>
            <label htmlFor="f1">
              <input
                type="file"
                id="f1"
                style={{ display: 'none' }}
                onChange={(e) => SetEdtblog({ ...edtBlog, image: e.target.files[0] })}
              />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="img-fluid p-3"
                  style={{ width: '800px', height: '400px', cursor: 'pointer' }}
                />
              )}
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Blog Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your blog title"
              value={edtBlog.title}
              onChange={(e) => SetEdtblog({ ...edtBlog, title: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Short Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Add a brief description"
              value={edtBlog.shortdescrptn}
              onChange={(e) => SetEdtblog({ ...edtBlog, shortdescrptn: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Blog Content</label>
            <textarea
              className="form-control"
              rows="8"
              placeholder="Write your blog content here..."
              value={edtBlog.content}
              onChange={(e) => SetEdtblog({ ...edtBlog, content: e.target.value })}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Category</label>
            <select
              className="form-select"
              value={edtBlog.category}
              onChange={(e) => SetEdtblog({ ...edtBlog, category: e.target.value })}>
              <option  value=""disabled selected>Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education" >Education</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    </>
  );
}

export default EditBlog;
