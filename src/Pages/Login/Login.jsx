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
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function Login() {
  const navigate = useNavigate()

  const API = 'https://ntbackend.uz/api/auth/login';
  const LoginForm = (e) => {
    e.preventDefault();
    axios
      .post(`${API}`, {
        email: e.target[0].value,
        password: e.target[1].value,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log();
          
          localStorage.setItem('Access', res.data.Token);
          navigate(`/allcards`);
          console.log(res.data);
          
        }
      }).catch((err) => {
        alert(err.response.data.message)
      })
  };
  useEffect(() => {
    if(localStorage.getItem("Access")){
      navigate('/')
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
                <h1 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign in
                </h1>
                <b>If you don't have an account <Link to={'/'}>Sign up</Link></b>
                <br />
                <form onSubmit={LoginForm}>
                  
              
               

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput 
                  required label="Your Email" id="form2" type="email" />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput 
                  required label="Password" id="form3" type="password" />
                </div>
             

                <MDBBtn className="mb-4" size="lg" type='submit'>
                  Login
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

export default Login;
