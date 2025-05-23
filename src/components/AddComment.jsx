import React,{useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal, Button, Form } from 'react-bootstrap';



function AddComment() {
    const [show, setShow] = useState(false)


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

     const [replyshow, setReplyShow] = useState(false)
      const [replyshows, setReplyShows] = useState(false)
      const [reportShow, setReportShow] = useState(false);
      const [reportReason, setReportReason] = useState('');
    
      const handleReportClose = () => {
        setReportShow(false);
        setReportReason('');
      };
      const handleReportShow = () => setReportShow(true);
    
    
    
      const handleReplyClose = () => setReplyShow(false);
      const handleReplyShow = () => setReplyShow(true)
    
      const handleReplyCloses = () => setReplyShows(false);
      const handleReplyShows = () => setReplyShows(true)
  return (
    <>
        <button className="btn btn-outline-secondary" onClick={handleShow} >
            <i className="fa-solid fa-comment"></i> Comment
    </button>

    <button className="btn btn-outline-success">
            <i className="fa-solid fa-share"></i> Share
          </button>
          <button className="btn btn-outline-danger" onClick={handleReportShow}>
            <i className="fa-solid fa-flag"></i> Report
          </button>
        

    

    {show && (
          <div className="mb-4 mt-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write your comment here..."
            ></textarea>
            <button className="btn btn-primary mt-2" onClick={handleClose}>
              Post Comment
            </button>
          </div>
        )}

        <br />

{/* <div className="d-flex"> */}
<ul className="list-group ">
          <li>
            <strong>Alice:</strong> Great blog!
            
            <Dropdown className="float-end">
              <Dropdown.Toggle variant="link" id="dropdown">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item >Edit</Dropdown.Item>
                <Dropdown.Item >Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <button className="btn btn-link text-dark float-end me-2" onClick={handleReplyShow}>
              <i className="fa-solid fa-reply"></i>
            </button>


            {replyshow &&
              <div className="mb-4">
                <input className="form-control" rows="3" placeholder="Reply" style={{ borderRadius: '5px' }} />
                <button className="btn btn-primary mt-2" onClick={handleReplyClose}>
                  send
                </button>
              </div>
            }

          </li>
          <li >
            <strong>Bob:</strong> Very informative!
            <button className="btn btn-link text-dark float-end me-2" onClick={handleReplyShows}>
              <i className="fa-solid fa-reply"></i>
            </button>
            {replyshows && (
              <div className="mb-4">
                <input className="form-control" rows="3" placeholder="Reply" style={{ borderRadius: '5px' }} />
                <button className="btn btn-primary mt-2" onClick={handleReplyCloses}>
                  send
                </button>
              </div>
            )}

          </li>
        </ul>
        {/* </div> */}

              <Modal show={reportShow} onHide={handleReportClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Report Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>Select Reason for Report</Form.Label>
                      <Form.Select
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                      >
                        <option value="" selected disabled>Choose a reason...</option>
                        <option value="Spam">Spam</option>
                        <option value="Inappropriate">Inappropriate Content</option>
                        <option value="Misinformation">Misinformation</option>
                        <option value="Harassment">Harassment</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
        
                    {reportReason === 'Other' && (
                      <Form.Group className="mt-3">
                        <Form.Label>Additional Comments</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                    )}
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleReportClose}>Cancel</Button>
                  <Button variant="danger" onClick={() => alert('Report Submitted!')}>
                    Submit Report
                  </Button>
                </Modal.Footer>
              </Modal>
        
    
    </>
  )
}

export default AddComment





