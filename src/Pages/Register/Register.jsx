import '../../App.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    telegram: ''
  });

  const navigate = useNavigate();
  const API = 'https://ntbackend.uz/api/auth/register';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const RegisterForm = (e) => {
    e.preventDefault();
    axios
      .post(API, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate('/login');
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'An error occurred');
      });
  };
  useEffect(() => {
    if(localStorage.getItem("Access")){
      navigate('/allcards')
    }
  },[])
  return (
    <div className='container'>
      <MDBContainer fluid className="flex">
        <MDBCard className="text-black my-5" style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <h1 className="text-center h1 fw-bold  mx-1 mx-md-4 mt-4">
                  Sign up
                </h1>
                <br />
                <b>If you have an account <Link to={'/login'}>Sign in</Link></b>
                <br />
                <form onSubmit={RegisterForm}>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="user me-3" size="lg" />
                    <MDBInput
                      required
                      label="Your First Name"
                      name="firstName"
                      type="text"
                      className="w-100"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="user me-3" size="lg" />
                    <MDBInput
                      required
                      label="Your Last Name"
                      name="lastName"
                      type="text"
                      className="w-100"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="user me-3" size="lg" />
                    <MDBInput
                      required
                      label="Your Username"
                      name="username"
                      type="text"
                      className="w-100"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size="lg" />
                    <MDBInput
                      required
                      label="Your Email"
                      name="email"
                      type="email"           
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput
                      required
                      label="Password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                    />
                  </div>
              

                  <MDBBtn className="mb-4" size="lg" type='submit'>
                    Register
                  </MDBBtn>
                </form>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Register;
