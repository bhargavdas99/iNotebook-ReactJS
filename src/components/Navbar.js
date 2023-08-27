import React, { useContext, useEffect, useState } from 'react'
import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";
// import noteContext from '../context/notes/noteContext';
import noteContext from '../context/notes/noteContext';

const Navbar = (props) => {
    const context = useContext(noteContext);
    const { getUser, user } = context;
    let location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser();
        }
        else {
            console.log("log in required!")
        }
        // eslint-disable-next-line
    }, [])

    return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" style={{position:"sticky",top:0}}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>

                        </ul>
                        <div className="form-check form-switch my-2">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.toggle}/>
                                <label className="form-check-label" for="flexSwitchCheckDefault" style={{color:"yellow"}}>{props.text} | </label>
                        </div>
                        {
                            localStorage.getItem('token') ?
                                <>
                                    <p className='my-1 mx-2' style={{ color: "white" }}>Welcome, {user.name}</p>
                                    <button className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>
                                </>
                                :
                                (<form className="d-flex" role="search">
                                    <Link className="btn btn-primary mx-1" to="/login" role='button'>Login</Link>
                                    <Link className="btn btn-primary mx-1" to="/signup" role='button'>SignUp</Link>
                                </form>)
                        }


                    </div>
                </div>
            </nav>
    
    )
}

export default Navbar