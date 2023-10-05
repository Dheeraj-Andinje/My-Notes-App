
import React from 'react';
import { Link, useLocation , useNavigate} from 'react-router-dom';
import Alert from './Alert';





export default function Navbar() {
    const navigate=useNavigate()
    let location = useLocation();
    // useEffect(()=>{
    //   console.log(location.pathname);
    // },[location]);
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login')

    }
    return (

        <div style={{ position: "fixed", width: "100%", top: "0", zIndex: "999" }}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
                <div className="container-fluid" >
                    <Link className="navbar-brand" to="/">My_Notes</Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>

                    </div>
                    <div className='d-flex'>
                        <div className='d-flex' >
                      {!localStorage.getItem('token')? <div className="d-flex">
                            <Link to="/login" className="  btn btn-primary btn-lg active" role="button" aria-pressed="true">Login</Link>
                            <Link to="signup" className="btn btn-secondary btn-lg active mx-1" role="button" aria-pressed="true">Sign up</Link>
                        </div>:<button className="mx-2 "style={{borderRadius:'5px',height:"40px"}} onClick={handleLogout} >Log out</button>}
                        </div>
                        <div>
                        <button className="navbar-toggler mx-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"> </span>
                        </button>
                        </div>
                    </div>

                </div>
            </nav>
            <div style={{ height: "70px" }}>
                <Alert />
            </div>
        </div>

    );
}
