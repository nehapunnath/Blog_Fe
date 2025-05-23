import React, { useEffect, useState } from 'react'
import { Card, Table, Button, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllUsersForAdmin } from '../../services/allApis';

function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
      fetchUser()
    },[])

const fetchUser = async () => {
  try {
    const result = await getAllUsersForAdmin();
    console.log(result)
    setUsers(result.data);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

  return (
    <>
      <div className="container-fluid ">
        <div className="d-flex justify-content-between align-items-center p-4">
          <Link to="/admin/dash" className="btn btn-outline-secondary mb-3">
                  <i className="fa-solid fa-arrow-left"></i> Back
                </Link>
        </div>
        {/* Header */}
        <div className="d-flex justify-content-between mb-4 mt-4">
          <h2>
            <i className="fas fa-users me-2"></i>
            Manage Users</h2>
         
        </div>

        {/* User Table */}
        <Card className="shadow-sm">
          <Card.Body>
            {
              users.length>0 ?
              <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                 {users.map((item, index) => (
                  <tr key={item._id || index} >
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                ))}

              </tbody>
            </table>
            :
            <h4 className='text-danger text-center'>No Users Yet!!</h4>
            }
            
          </Card.Body>
        </Card>
      </div>

    </>
  )
}

export default AdminUsers