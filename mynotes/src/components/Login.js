import React, { useState, useContext } from 'react';
import noteContext from '../contex/notes/noteContex';
import { useNavigate } from 'react-router-dom'


function Login() {
    const navigate = useNavigate()
    const context = useContext(noteContext)
    const { set_Alert } = context
    const [credentials, setCredentials] = useState({ Email: "", Password: "" })
    const handleonSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(credentials);
            const { Email, Password } = credentials;
            const url = 'http://localhost:5000/api/auth/login'
            const response = await fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.

                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Email, Password })
                // body data type must match "Content-Type" header

            });
            const jsn = await response.json();
            if (response.status === 200) {
                set_Alert('Login successful', 'success');
                localStorage.setItem('token', jsn.authToken);
                navigate('/')
            }
            else {
                
                set_Alert(`Enter correct details`, 'danger')
            }



        } catch (error) {
            set_Alert(error, 'danger')
        }

    }



    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div style={{ marginTop: "25vh",backgroundColor:" #63819693" }} className='container border border-primary' >
            <div  className='container ' >
                <h2 className='my-3' >Login</h2>
                <form onSubmit={handleonSubmit}>
                    <div className="form-group my-4">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='Email' value={credentials.Email} onChange={onChange} placeholder="Enter email"></input>

                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='Password' value={credentials.Password} onChange={onChange} placeholder="Password"></input>
                    </div>

                    <button type="submit " className="btn btn-primary my-3">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
