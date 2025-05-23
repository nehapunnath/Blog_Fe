import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Landing() {
  return (
    <>
     
      
      <Header/>
      
      {/* Hero Section */}
      <section className='hero-section d-flex align-items-center' style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #006d77 0%, #83c5be 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container text-center text-white py-5 position-relative z-index-1">
          <h1 className='display-3 fw-bold mb-4' style={{
            letterSpacing: '2px',
            textShadow: '0 4px 15px rgba(0,0,0,0.3)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)'
          }}>
            Blog Nova
          </h1>
          <p className="lead mb-4" style={{
            maxWidth: '700px',
            margin: '0 auto',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)'
          }}>
            <i className="fas fa-quote-left me-2"></i> 
            Unleash Your Voice, Illuminate the World
            <i className="fas fa-quote-right ms-2"></i>
          </p>
          <p className="mb-5" style={{
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            Your ultimate platform to express, inspire, and engage with the world. 
            Start sharing your thoughts, stories, and expertise today.
          </p>
          <div>
            <Link 
              to={'/auth'} 
              className="btn btn-warning btn-lg px-4 py-2 fw-bold"
              style={{
                borderRadius: '50px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <i className="fas fa-rocket me-2"></i> Get Started - It's Free
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="fw-bold mb-4">What is <span style={{ color: '#006d77' }}>BlogNova?</span></h2>
              <p className="lead mb-4" style={{ lineHeight: '1.8' }}>
                <i className="fas fa-lightbulb text-warning me-2"></i>
                BlogNova is an innovative blogging platform designed for creators, storytellers, 
                and thinkers who want to share their insights with the world.
              </p>
              <p style={{ lineHeight: '1.8' }}>
                Whether you're a professional writer, a passionate hobbyist, or someone with an 
                interesting perspective, BlogNova gives you the tools to craft stunning, engaging 
                content effortlessly.
              </p>
              {/* <Link 
                to="/features" 
                className="btn btn-outline-primary mt-3"
                style={{ borderRadius: '50px', padding: '8px 20px' }}
              >
                <i className="fas fa-info-circle me-2"></i> Learn More
              </Link> */}
            </div>
            <div className="col-lg-6">
              <div className="rounded-3 overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Writing blog post" 
                  className="img-fluid"
                  style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ background: 'white' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Why Choose <span style={{ color: '#006d77' }}>BlogNova?</span></h2>
            <p className="lead" style={{ maxWidth: '700px', margin: '0 auto' }}>
              <i className="fas fa-star text-warning me-2"></i>
              Everything you need to create, share, and grow your audience
              <i className="fas fa-star text-warning ms-2"></i>
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                <div className="icon-wrapper mb-4" style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(0, 109, 119, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-pen-nib text-primary fa-2x"></i>
                </div>
                <h4 className="fw-bold mb-3">Intuitive Editor</h4>
                <p className="text-muted">
                  Craft beautiful posts with our powerful yet simple editor. No coding required.
                </p>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                <div className="icon-wrapper mb-4" style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(0, 109, 119, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-users text-primary fa-2x"></i>
                </div>
                <h4 className="fw-bold mb-3">Engage Your Audience</h4>
                <p className="text-muted">
                  Build a community with  likes, with your readers.
                </p>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                <div className="icon-wrapper mb-4" style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(0, 109, 119, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-bell text-primary fa-2x"></i>
                </div>
                <h4 className="fw-bold mb-3">Real-time Updates</h4>
                <p className="text-muted">
                  Get instant notifications when readers interact with your content.
                </p>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                <div className="icon-wrapper mb-4" style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(0, 109, 119, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-chart-line text-primary fa-2x"></i>
                </div>
                <h4 className="fw-bold mb-3">Powerful Analytics</h4>
                <p className="text-muted">
                  Understand your audience with detailed analytics and reader insights.
                </p>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                <div className="icon-wrapper mb-4" style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(0, 109, 119, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-palette text-primary fa-2x"></i>
                </div>
                <h4 className="fw-bold mb-3">Custom Themes</h4>
                <p className="text-muted">
                  Choose from beautiful templates or create your own unique design.
                </p>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                <div className="icon-wrapper mb-4" style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(0, 109, 119, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-mobile-alt text-primary fa-2x"></i>
                </div>
                <h4 className="fw-bold mb-3">Mobile Friendly</h4>
                <p className="text-muted">
                  Write and manage your blog from anywhere with our mobile-optimized platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-5" style={{ background: '#f8f9fa' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">What Our Users Say</h2>
            <p className="lead" style={{ maxWidth: '700px', margin: '0 auto' }}>
              <i className="fas fa-heart text-danger me-2"></i>
              Join thousands of creators who share their stories with BlogNova
              <i className="fas fa-heart text-danger ms-2"></i>
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                <div className="d-flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-warning"></i>
                  ))}
                </div>
                <i className="fas fa-quote-left text-muted mb-3 fa-lg"></i>
                <p className="mb-4" style={{ lineHeight: '1.8' }}>
                  "BlogNova has completely transformed how I share my ideas. The editor is so intuitive and the community engagement is amazing!"
                </p>
                <div className="d-flex align-items-center mt-auto">
                  <img 
                    src="https://randomuser.me/api/portraits/women/32.jpg" 
                    alt="User" 
                    className="rounded-circle me-3" 
                    width="50" 
                    height="50"
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">Sarah Johnson</h6>
                    <small className="text-muted">Travel Blogger</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                <div className="d-flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-warning"></i>
                  ))}
                </div>
                <i className="fas fa-quote-left text-muted mb-3 fa-lg"></i>
                <p className="mb-4" style={{ lineHeight: '1.8' }}>
                  "As a tech writer, I appreciate the clean design and powerful features. My readership has grown 300% since switching to BlogNova."
                </p>
                <div className="d-flex align-items-center mt-auto">
                  <img 
                    src="https://randomuser.me/api/portraits/men/45.jpg" 
                    alt="User" 
                    className="rounded-circle me-3" 
                    width="50" 
                    height="50"
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">Michael Chen</h6>
                    <small className="text-muted">Tech Writer</small>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4" style={{ borderRadius: '15px' }}>
                <div className="d-flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-warning"></i>
                  ))}
                </div>
                <i className="fas fa-quote-left text-muted mb-3 fa-lg"></i>
                <p className="mb-4" style={{ lineHeight: '1.8' }}>
                  "I started my food blog as a hobby, but with BlogNova's tools, I've turned it into a full-time business. Couldn't be happier!"
                </p>
                <div className="d-flex align-items-center mt-auto">
                  <img 
                    src="https://randomuser.me/api/portraits/women/68.jpg" 
                    alt="User" 
                    className="rounded-circle me-3" 
                    width="50" 
                    height="50"
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">Emma Rodriguez</h6>
                    <small className="text-muted">Food Blogger</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(135deg, #006d77 0%, #83c5be 100%)' }}>
        <div className="container py-5 text-center">
          <h2 className="fw-bold mb-4">Ready to Start Your Blogging Journey?</h2>
          <p className="lead mb-5" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <i className="fas fa-globe me-2"></i>
            Join thousands of creators who are already sharing their stories with the world.
            <i className="fas fa-globe ms-2"></i>
          </p>
          <Link 
            to={'/auth'} 
            className="btn btn-light btn-lg px-4 py-2 fw-bold"
            style={{
              borderRadius: '50px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s',
              color: '#006d77'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <i className="fas fa-pen-fancy me-2"></i> Start Writing Now
          </Link>
        </div>
      </section>

      <Footer/>
    </>
  )
}

export default Landing