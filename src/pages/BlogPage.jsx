import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Modal, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { getBlogpgApi, likeBlogApi, shareBlogApi, getSharesApi, reportBlogApi, checkReportedApi, } from '../services/allApis';
import base_url from '../services/base_url';
import Footer from '../components/Footer'
import { toast } from 'react-toastify';

function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogpg, setBlogpg] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false); // Track if the user has liked the blog
  const [user, setUser] = useState("");
  const [reportShow, setReportShow] = useState(false);
  const [shareShow, setShareShow] = useState(false);
  const [reportReason, setReportReason] = useState('');
  // const [additionalComments, setAdditionalComments] = useState('');
  const [shares, setShares] = useState([]);
  const [currentUrl, setCurrentUrl] = useState('');
  const [isReported, setIsReported] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      setUser(sessionStorage.getItem('user'));
    }
    fetchBlog();
    fetchShareCount();
    checkIfReported();
    setCurrentUrl(window.location.href);
  }, [id]);

  const fetchBlog = async () => {
  try {
    const result = await getBlogpgApi(id);
    if (result.status === 200) {
      setBlogpg(result.data);
      setLikes(result.data.likes || 0);

      const currentUserId = sessionStorage.getItem('userId');
      if (result.data.likedBy?.includes(currentUserId)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  } catch (error) {
    toast.error("Failed to fetch blog");
  }
};


  const fetchShareCount = async () => {
    try {
      const result = await getSharesApi(id);
      if (result) {
        setShares(result);
      }
    } catch (error) {
      console.error("Error fetching shares:", error);
    }
  };

  const checkIfReported = async () => {
    try {
      const result = await checkReportedApi(id);
      if (result.status === 200) {
        setIsReported(result.data.isReported);
      }
    } catch (error) {
      console.error("Error checking reported status:", error);
    }
  };



  const handleLike = async () => {
  try {
    const result = await likeBlogApi(id);
    if (result.status === 200) {
      setLikes(result.data.likes || 0);
      setLiked(result.data.liked); // assume backend returns true/false
      toast.success(result.data.message);
    }
  } catch (error) {
    toast.error("Failed to like/unlike blog");
  }
};


  const handleShareClick = () => {
    setShareShow(true);
  };

  const handleShareConfirm = async () => {
    try {
      const shareData = { url: currentUrl, user };
      const result = await shareBlogApi(id, shareData);
      if (result && result.status === 200) {
        toast.success("Blog shared successfully!");
        fetchShareCount();
        setShareShow(false);
      }
    } catch (error) {
      toast.error("Failed to share blog");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl)
      .then(() => toast.success("URL copied to clipboard!"))
      .catch(() => toast.error("Failed to copy URL"));
  };

  const handleReportSubmit = async () => {
    try {
      const reportData = {
        user,
        reason: reportReason,
        additionalComments: reportReason === 'Other' ? additionalComments : ''
      };

      const result = await reportBlogApi(id, reportData);

      if (result.status === 200) {
        setIsReported(true);
        toast.success("Blog reported successfully. It will be reviewed by our team.");
        setReportShow(false);
        navigate('/dash');
      }
    } catch (error) {
      toast.error("Failed to report blog");
    }
  };

  if (isReported) {
    return (
      <div className="container mt-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Content Removed</Alert.Heading>
          <p>
            This blog has been reported and is currently under review.
          </p>
          <hr />
          <div className="d-flex justify-content-center">
            <Button variant="outline-danger" onClick={() => navigate('/dash')}>
              Return to Dashboard
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-4">
        <Link to="/dash" className="btn btn-outline-secondary rounded-circle">
          <i className="fa-solid fa-arrow-left text-dark"></i>
        </Link>
      </div>

      <div className="container p-2">
        {blogpg ? (
          <>
            <h1 className="fw-bold">{blogpg.title}</h1>
            <p className="text-muted">
              Published on {new Date(blogpg.createdAt).toDateString()} by {blogpg.userId?.username || 'Anonymous'}

            </p>
            {blogpg.tags && blogpg.tags.length > 0 && (
              <div className="mb-3">
                {blogpg.tags.map((tag, index) => (
                  <span key={index} className="badge bg-secondary me-1">{tag}</span>
                ))}
              </div>
            )}
            <img
              src={`${base_url}/uploaded/${blogpg.image}`}
              alt="Blog"
              className="img-fluid rounded shadow mb-4"
              style={{ width: '100%', height: '550px', objectFit: 'fill' }}
            />
            <p>{blogpg.content}</p>
          </>
        ) : (
          <h4 className='text-center text-warning fw-bold'>Loading Blog...</h4>
        )}

        <div className="d-flex gap-3 my-4">
          <button
            className={`btn ${liked ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={handleLike}
          >
            <i className="fa-solid fa-thumbs-up"></i> {liked ? 'Unlike' : 'Like'} ({likes})
          </button>
          <button className="btn btn-outline-success" onClick={handleShareClick}>
            <i className="fa-solid fa-share"></i> Share
          </button>
          {isReported ? (
            <button className="btn btn-danger" disabled>
              <i className="fa-solid fa-flag"></i> Reported
            </button>
          ) : (
            <button className="btn btn-outline-danger" onClick={() => setReportShow(true)}>
              <i className="fa-solid fa-flag"></i> Report
            </button>
          )}
        </div>

        {/* Share Modal */}
        <Modal show={shareShow} onHide={() => setShareShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Share This Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Share this blog by copying the link below:</p>
            <InputGroup className="mb-3">
              <Form.Control
                value={currentUrl}
                readOnly
              />
              <Button
                variant="outline-secondary"
                onClick={copyToClipboard}
              >
                <i className="fa-solid fa-copy"></i> Copy
              </Button>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={() => setShareShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleShareConfirm}>
              Confirm Share
            </Button> */}
          </Modal.Footer>
        </Modal>

        {/* Report Modal */}
        <Modal show={reportShow} onHide={() => setReportShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Report Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Select Reason for Report</Form.Label>
                <Form.Select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  required
                >
                  <option value="" selected disabled>Choose a reason...</option>
                  <option value="Spam">Spam</option>
                  <option value="Inappropriate Content">Inappropriate Content</option>
                  <option value="Misinformation">Misinformation</option>
                  <option value="Harassment">Harassment</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>

              {reportReason === 'Other' && (
                <Form.Group className="mb-3">
                  <Form.Label>Additional Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={additionalComments}
                    onChange={(e) => setAdditionalComments(e.target.value)}
                  />
                </Form.Group>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setReportShow(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleReportSubmit}
              disabled={!reportReason}
            >
              Submit Report
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <Footer />
    </>
  );
}

export default BlogPage;