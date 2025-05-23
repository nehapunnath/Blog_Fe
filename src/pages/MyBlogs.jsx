import React, { useContext, useEffect, useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Link, Links } from 'react-router-dom'
import { deleteBlogApi, getBlogsApi } from '../services/allApis'
import base_url from '../services/base_url'
import { addblogContext, editblogContext } from '../context/contextApi'
import { toast } from 'react-toastify'

function MyBlogs() {

  const [bloglist, setBloglist] = useState([])

  const { addblog, setaddBlog } = useContext(addblogContext)
  const {editblog,setEditBlog}=useContext(editblogContext)

  useEffect(() => {
    getData()
  }, [addblog,editblog])

  const getData = async () => {
    const result = await getBlogsApi()
    console.log(result)
    if (result.status == 200) {
      setBloglist(result.data)
    }

  }

  const deleteBlog = async (id) => {
    const result = await deleteBlogApi(id)
    if (result.status == 200) {
      getData()
      toast.success("Blog has been deleted successfully!!!")
    }
    else {
      toast.error("Failed to delete the blog. Please try again!!!")
      console.log(result)
    }

  }


  return (
    <>
      <div className="container-fluid">

        <div className="container-fluid mt-3">

          <Link to="/dash" className="btn btn-outline-secondary rounded-circle">
            <i className="fa-solid fa-arrow-left text-dark"></i>
          </Link>
        </div>

        <div className='container-fluid m-4 ' style={{ minHeight: '150vh' }}>
          {/* <AddBlog /> */}


          <div className='d-flex justify-content-between align-items-center border-bottom mb-5 '>
            <h2 className='fw-bold '>My Blogs</h2>

            <Link className='btn btn-primary mt-4 m-3 float-start' to={'/addblog'} >
              Add Blog
            </Link>

          </div>



          <br />
          {
            bloglist.length > 0 ?

              <Row xs={1} md={2} lg={3} className="g-4">
                {
                  bloglist.map(item => (
                    <Col key={item._id}>
                      <Card className="shadow" style={{height:'30rem',overflow: 'hidden', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
                        <Card.Img variant="top" src={`${base_url}/uploaded/${item.image}`} style={{ height: '200px', objectFit: 'cover' }} />
                        {/* Show approval status */}
                        <span
                          className="mb-2 d-inline-flex align-items-center px-2 py-1 "
                          style={{
                            fontSize: '0.8rem',
                            color:
                              item.status === 'Approved'
                                ? '#198754'
                                : item.status === 'Pending'
                                  ? '#856404'
                                  : '#842029',
                            backgroundColor:
                              item.status === 'Approved'
                                ? '#d1e7dd'
                                : item.status === 'Pending'
                                  ? '#fff3cd'
                                  : '#f8d7da',
                            border: '1px solid',
                            borderColor:
                              item.status === 'Approved'
                                ? '#198754'
                                : item.status === 'Pending'
                                  ? '#ffc107'
                                  : '#dc3545'
                          }}
                        >
                          <i
                            className={`me-1 fa-solid ${item.status === 'Approved'
                              ? 'fa-circle-check'
                              : item.status === 'Pending'
                                ? 'fa-hourglass-half'
                                : 'fa-circle-xmark'
                              }`}
                          ></i>
                          {item.status === 'Approved'
                            ? 'Published'
                            : item.status === 'Pending'
                              ? 'Pending Approval'
                              : 'Rejected'}
                        </span>
                        <Card.Body className="d-flex flex-column">
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Text>{item.shortdescrptn}</Card.Text>

                          {/* Conditional Button */}
                          {item.status === 'Approved' ? (
                            <Link className="btn btn-outline-primary mt-auto" to={`/blogpg/${item._id}`}>
                              Read
                            </Link>
                          ) : item.status === 'Pending' ? (
                            <button className="btn btn-outline-secondary mt-auto" disabled>
                              Awaiting Approval
                            </button>
                          ) : (
                            <button className="btn btn-outline-danger mt-auto" disabled>
                              Rejected
                            </button>
                          )}

                          <div className='d-flex justify-content-between align-items-center mt-3'>
                            <Link className='btn' to={`/edit/${item._id}`} state={{ blog: item }}>
                              <i className="fa-solid fa-pen-to-square text-warning"></i>
                            </Link>

                            <button className="btn" onClick={() => deleteBlog(item._id)}>
                              <i className="fa-solid fa-trash text-danger"></i>
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                }
              </Row>


              :
              <h4 className='text-center text-danger'>No Blogs Created Yett!!!</h4>
          }
        </div>


      </div>










    </>
  )
}

export default MyBlogs