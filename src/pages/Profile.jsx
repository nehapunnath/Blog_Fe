import { useState, useEffect } from 'react';
import { Card, Form, Button, Image, Row, Col, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getUserBlogSummary, UpdateProfile } from '../services/allApis';
import base_url from '../services/base_url';

function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [preview, setPreview] = useState('');
    const [profileData, setProfileData] = useState({
        username: '',email: '',bio: '',location: '',profileImage: '',joined: '',
    });

    const [summary, setSummary] = useState({ totalBlogs: 0, totalLikes: 0 });


    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setProfileData({
                username: sessionStorage.getItem('user') || '',
                email: sessionStorage.getItem('email') || '',
                bio: sessionStorage.getItem('bio') || '',
                location: sessionStorage.getItem('location') || '',
                profileImage: sessionStorage.getItem('profile') || '',
                joined: sessionStorage.getItem('joined') || '',
            });
        }
    }, []);

    useEffect(() => {
        if (profileData.profileImage && typeof profileData.profileImage !== 'string') {
            setPreview(URL.createObjectURL(profileData.profileImage));
        } else if (typeof profileData.profileImage === 'string' && profileData.profileImage) {
            setPreview(`${base_url}/uploaded/${profileData.profileImage}`);
        } else {
            setPreview('https://cdn-icons-png.flaticon.com/512/3135/3135715.png');
        }
    }, [profileData.profileImage]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
            toast.warning('Only JPG, JPEG or PNG images allowed');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.warning('Image must be under 2MB');
            return;
        }
        setProfileData({ ...profileData, profileImage: file });
    };

    const handleUpdate = async () => {
        const { username, email, bio, location, profileImage } = profileData;

        if (!username || !email) {
            toast.warning('Username and Email are required');
            return;
        }

        try {
            const result = await UpdateProfile(profileData);
            if (result.status === 200) {
                toast.success('Profile updated!');
                sessionStorage.setItem('user', username);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('bio', bio);
                sessionStorage.setItem('location', location);
                if (result.data.profile) {
                    sessionStorage.setItem('profile', result.data.profile);
                    setProfileData(prev => ({ ...prev, profileImage: result.data.profile }));
                }
                setEditMode(false);
            } else {
                throw new Error('Failed to update');
            }
        } catch (error) {
            toast.error('Update failed. Try again.');
        }
    };

    const formatJoinDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    };
useEffect(() => {
  const fetchSummary = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.log('User ID not found');
      return;
    }

    try {
      const data = await getUserBlogSummary(userId);
      console.log('Fetched data:', data);
      setSummary(data);
    } catch (err) {
      console.error('Error fetching summary:', err);
      toast.error('Could not fetch blog summary');
    }
  };

  if (sessionStorage.getItem('token')) {
    fetchSummary();
  } else {
    console.log('Token not found in sessionStorage');
  }
}, []);


    return (
        <div className="container-fluid py-5" style={{ background: 'linear-gradient(135deg, #ece9e6, #ffffff)' }}>
            
            <Row className="justify-content-center">
                
                <Col lg={10}>
                <Link to="/dash" className="btn btn-outline-secondary rounded-circle mb-4">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
                    <Card className="rounded-4 shadow-lg glass-card border-0 overflow-hidden mt-4">
                        <div className="bg-dark" style={{ height: '180px', backgroundImage: 'url(https://source.unsplash.com/random/1400x400/?tech)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

                        <Row className="p-4">
                            {/* Profile Sidebar */}
                            <Col md={4} className="text-center d-flex flex-column align-items-center">
                                <div className="position-relative" style={{ marginTop: '-70px' }}>
                                    <Image
                                        src={preview}
                                        roundedCircle
                                        width={140}
                                        height={140}
                                        className="border border-4 border-white shadow"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    {editMode && (
                                        <label htmlFor="upload" className="position-absolute bottom-0 end-0 bg-primary p-2 rounded-circle text-white" style={{ cursor: 'pointer' }}>
                                            <i className="bi bi-camera-fill"></i>
                                            <input type="file" id="upload" hidden onChange={handleFileChange} />
                                        </label>
                                    )}
                                </div>
                                <h4 className="mt-3">{profileData.username}</h4>
                                <p className="text-muted">{profileData.email}</p>
                                <p className="small text-secondary">Joined on {formatJoinDate(profileData.joined)}</p>
                            </Col>

                            {/* Form Section */}
                            <Col md={8}>
                                <Form className="mt-3 px-3">
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Username *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={profileData.username}
                                                    readOnly={!editMode}
                                                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email *</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    value={profileData.email}
                                                    readOnly={!editMode}
                                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Bio</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={profileData.bio}
                                            readOnly={!editMode}
                                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={profileData.location}
                                            readOnly={!editMode}
                                            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                                        />
                                    </Form.Group>

                                    <div className="d-flex justify-content-end gap-2 mt-4">
                                        {editMode ? (
                                            <>
                                                <Button variant="outline-dark" onClick={() => setEditMode(false)}>Cancel</Button>
                                                <Button variant="success" onClick={handleUpdate}>Save Changes</Button>
                                            </>
                                        ) : (
                                            <Button variant="primary" onClick={() => setEditMode(true)}>
                                                <i className="bi bi-pencil-square me-2"></i>Edit Profile
                                            </Button>
                                        )}
                                    </div>
                                </Form>
                                {/* <hr className="my-4" /> 
                                <Row className="px-4 pb-4">
                                    <Col md={6}>
                                        <Card className="shadow-sm border-0 text-center py-3">
                                            <h5 className="mb-0">📝 Total Blogs</h5>
                                            <h3 className="text-primary">{summary.totalBlogs}</h3>
                                        </Card>
                                    </Col>
                                    <Col md={6}>
                                        <Card className="shadow-sm border-0 text-center py-3">
                                            <h5 className="mb-0">❤️ Total Likes</h5>
                                            <h3 className="text-danger">{summary.totalLikes}</h3>
                                        </Card>
                                    </Col>
                                </Row> */}

                            </Col>
                        </Row>

                    </Card>
                </Col>
            </Row>

            <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border-radius: 20px;
        }
      `}</style>
        </div>
    );
}

export default Profile;
