import {Form, Button} from 'react-bootstrap';
import { useForm} from "react-hook-form";
import {useDispatch } from 'react-redux';
import { login } from './AuthSlice';
import { useNavigate } from 'react-router-dom';

export default function Register(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit, 
    } = useForm()

    const RegisterPage = (data) =>{
        console.log(data);
        let formdata = {
            email: data.registeremail,
            password: data.registerpassword,
        }
       console.log(formdata)
        fetch(' http://localhost:5000/register',{
            method: 'POST',
            body: JSON.stringify(formdata),
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(response =>{ 
          console.log(response)
          if(response.accessToken){
            dispatch(login(response.accessToken))

          }

      })
    }
    const LoginPage = (item) =>{
        const userdata ={
            email:item.loginemail,
            password:item.loginpassword,
        }
        fetch(' http://localhost:5000/signin',{
            method: 'POST',
            body: JSON.stringify(userdata),
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(response =>{ 
          console.log(response)
          if(response.accessToken){
            dispatch(login(response.accessToken))
            navigate('/dasboardpage')
          }

      })
    }

   


    return(
        <div style={{display:"flex",gap:"50px", justifyContent:"center", margin:"100px"}}>
        <div>
            <h1>Register</h1>
        <Form onSubmit={handleSubmit(RegisterPage)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("registeremail")}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register("registerpassword")} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div>
        <div>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit(LoginPage)}>
      <Form.Group className="mb-3" controlId="formBasicLoginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("loginemail")}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLoginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register("loginpassword")}  />
      </Form.Group>
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
        </div>
        </div>
    )
}