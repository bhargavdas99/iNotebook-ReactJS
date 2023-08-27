import React,{ useContext, useEffect,useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';

const Signup = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
    const context = useContext(noteContext);
    const { getUser } = context;
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })

        }
        );
        const json = await response.json();
        console.log(json);
        if(json.success){
        localStorage.setItem('token', json.authtoken);
        navigate("/");
        getUser();
        props.showAlert("Your Has Been Acount Created","success")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <div className='container text-center my-3'><h2>SignUp to start using iNotebook</h2></div>
            <div className='container mt-2' style={{ width: "50%"}}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' value={credentials.name} aria-describedby="emailHelp" onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" value={credentials.password} className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" value={credentials.cpassword} className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup