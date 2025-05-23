import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';

function AdminAuth() {

  const [login,setLogin]=useState(false)

  const loginAs=()=>{
    setLogin(!login)
  }
  

  return (
    <>
       <div className=' container-fluid  d-flex justify-content-center align-items-center' style={{height:'100vh'}}>
          <div className='w-25 border shadow bg-light border-1 border-dark p-3 h-0'>
            <h2 className='text-center'>Access Your Admin Panel</h2>
            <div className='d-flex justify-content-center align-items-center'>
              <DropdownButton  id="dropdown-basic-button" title={`Login as ${login ? 'User' : 'Admin'}`}>
               <Dropdown.Item as={Link} to={'/adminauth'}>Admin</Dropdown.Item>
               <Dropdown.Item as={Link} to={'/auth'}>User</Dropdown.Item>
             </DropdownButton>
    
            </div>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mt-2 mb-3" >
              <Form.Control type="email"  placeholder="name@example.com" required/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Password" required />
            </FloatingLabel>

           <button className="btn btn-success w-100" >Sign Up</button>
           </div>
           </div>

    
    
    </>
  )
}

export default AdminAuth