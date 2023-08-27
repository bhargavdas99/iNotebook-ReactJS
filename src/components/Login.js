import React,{ useContext, useEffect,useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { getUser } = context;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        }
        );
        const json = await response.json();
        console.log(json);
        
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            getUser();
            props.showAlert("Logged In Successfully!", "success")
            // setTimeout(() => {
            //     // window.location.reload();
            //   }, 2000); 
            
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container d-flex flex-column justify-content-center  align-items-center">
            <div className='container text-center my-3'><h2>Please Login to continue:</h2></div>
            <div className="container" style={{ width: "40%"}}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" value={credentials.password} className="form-control" id="password" name='password' onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login