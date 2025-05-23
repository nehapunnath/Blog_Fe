import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-toastify';
import { adminLoginApi, loginApi, registrationApi } from '../services/allApis';
import { authContext } from '../context/contextApi';

function Auth() {
  const [authstatus, setAuthStatus] = useState(false);
  const [user, setUser] = useState({
    username: "", email: "", password: ""
  });

  const nav = useNavigate();
  const { setAuth } = useContext(authContext);

  const changeStatus = () => {
    setAuthStatus(!authstatus);
  };

  const handleReg = async () => {
    const { email, username, password } = user;
    if (!email || !username || !password) {
      toast.warning("Enter valid Details");
    } else {
      const result = await registrationApi(user);
      if (result.status === 200) {
        toast.success("Account created! You're all set to sign in");
        setUser({ username: "", email: "", password: "" });
        changeStatus();
      } else {
        if (result.response?.data) {
          toast.error(result.response.data);
        } else {
          toast.warning("Something Went Wrong!!!");
        }
        setUser({ username: "", email: "", password: "" });
      }
    }
  };

  const handleLogin = async (isAdmin = false) => {
    const { email, password } = user;
    if (!email || !password) {
      toast.warning("Enter Valid Data!!!");
      return;
    }

    let result;

    try {
      result = isAdmin ? await adminLoginApi(user) : await loginApi(user);

      if (result && result.status === 200) {
        toast.success(isAdmin ? "Admin Logged In" : "Welcome back! You’ve successfully logged in");

        sessionStorage.setItem('token', result.data.token);
        sessionStorage.setItem('user', result.data.user);
        sessionStorage.setItem('email', result.data.email);
        sessionStorage.setItem('joined', result.data.joined);
        sessionStorage.setItem('bio', result.data.bio);
        sessionStorage.setItem('location', result.data.location);
        sessionStorage.setItem('profile', result.data.profile);
        sessionStorage.setItem('userId', result.data.userId);

        setAuth(true);
        setUser({ username: "", email: "", password: "" });

        nav(isAdmin ? '/admin/dash' : '/dash');
      } else {
        toast.error("Login Failed!!!");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.warning("Something went wrong!");
      setUser({ username: "", email: "", password: "" });
    }
  };

  return (
    <div className='container-fluid d-flex justify-content-center align-items-center min-vh-100' style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className='w-25 border shadow bg-light p-3' style={{ borderRadius: '15px' }}>
        <h2 className='text-center'>{authstatus ? 'Create Account' : 'Welcome Back!!!'}</h2>
        <p className='text-center text-muted m-2'>{authstatus ? 'Join Today' : 'Please Login to Continue'}</p>

        <Form.Group className="mb-3">
          <InputGroup className="custom-input-group">
            <InputGroup.Text>
              <i className="fas fa-envelope"></i>
            </InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Email Address"
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
            />
          </InputGroup>
        </Form.Group>

        {authstatus && (
          <Form.Group className="mb-3">
            <InputGroup className="custom-input-group">
              <InputGroup.Text>
                <i className="fas fa-user"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                required
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                value={user.username}
              />
            </InputGroup>
          </Form.Group>
        )}

        <Form.Group className="mb-4">
          <InputGroup className="custom-input-group">
            <InputGroup.Text>
              <i className="fas fa-lock"></i>
            </InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
            />
          </InputGroup>
        </Form.Group>

        {authstatus ? (
          <button className="btn btn-success w-100" onClick={handleReg}>Sign Up</button>
        ) : (
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-primary w-50 me-1" onClick={() => handleLogin(false)}>User Login</button>
            <button className="btn btn-dark w-50 ms-1" onClick={() => handleLogin(true)}>Admin Login</button>
          </div>
        )}

        <div className="mt-2 d-flex justify-content-evenly align-items-center">
          {authstatus ? (
            <span>Already have an account? <button className="btn btn-link" onClick={changeStatus}>Sign in</button></span>
          ) : (
            <span>Don't have an account? <button className="btn btn-link" onClick={changeStatus}>Sign Up</button></span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
