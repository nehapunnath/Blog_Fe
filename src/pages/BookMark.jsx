import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function BookMark() {
    return (
        <>
        
           <div className=" m-4"> 
              <Link 
                to="/dash" 
                className="btn btn-outline-secondary rounded-circle"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Link>
            </div>

            <div className="d-flex justify-content-between align-items-between mt-5 ">
                <Card style={{ width: '25rem', margin: '50px' }} className='shadow'>
                    <Card.Img variant="top" src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Link className='btn btn-outline-success rounded-pill' to={'/blogpg'}>Read More</Link>

                    </Card.Body>
                </Card>

            </div>

        </>
    )
}

export default BookMark