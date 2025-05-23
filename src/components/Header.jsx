import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <Navbar
            style={{
                backgroundColor:  '#f8f9fa',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%', // Corrected from 100vh to 100%
                height: '60px', // Explicit height for consistency
                zIndex: 1100, // Ensure it’s above the sidebar
            }}
        >
            <Container className="d-flex justify-content-between">
                <Navbar.Brand href="#home" style={{ animation: 'fadeIn 1.5s ease-in-out' }}>
                    <i className="fa-solid fa-feather-pointed"></i>
                    {' '}
                    Blog Nova
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;