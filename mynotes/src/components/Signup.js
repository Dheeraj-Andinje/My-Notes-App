import React, { useState, useContext } from 'react';
import noteContext from '../contex/notes/noteContex';
import { useNavigate } from 'react-router-dom'


function Signup() {
    const navigate = useNavigate()
    const context = useContext(noteContext)
    const { set_Alert } = context
    const [credentials, setCredentials] = useState({Name:"", Email: "", Password: "", cPassword:""})
    const handleonSubmit = async (e) => {
        try {
            e.preventDefault();
           
            const {Name, Email, Password, cPassword } = credentials;
            if (Password===cPassword) {
                const url = 'http://localhost:5000/api/auth/createuser'
                const response = await fetch(url, {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
    
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({Name, Email, Password })
                    // body data type must match "Content-Type" header
    
                });
                const jsn = await response.json();
                if (response.status === 200) {
                    set_Alert('Sign up successful', 'success');
                    localStorage.setItem('token', jsn.authToken);
                    navigate('/')
                }
                else {
                    const er = jsn.error.toString();
                    set_Alert(`Error:${er}`, 'danger')
                }
    
            } else {
                set_Alert("Confirm password should match the password",'danger')
            }
           


        } catch (error) {
            set_Alert(error, 'danger')
        }

    }



    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container ' >
            <div style={{ marginTop: "25vh",backgroundColor:" #63819693" }} className='container border border-primary' >
            <div className='container' >
                <h2 className='my-4'>Sign up</h2>
                <form onSubmit={handleonSubmit}>
                    <div className="form-group my-4">
                        <label htmlFor="exampleInputName1">Name</label>
                        <input type="text" minLength={3} className="form-control" id="exampleInputName1" aria-describedby="nameHelp" name='Name' value={credentials.Name} onChange={onChange} placeholder="Enter name"></input>

                    </div>
                    <div className="form-group my-4">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='Email' value={credentials.Email} onChange={onChange} placeholder="Enter email"></input>

                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" minLength={5}className="form-control" id="exampleInputPassword1" name='Password' value={credentials.Password} onChange={onChange} placeholder="Password"></input>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="exampleInputPassword2">Confirm password</label>
                        <input type="password" className="form-control" minLength={5}id="exampleInputPassword2" name='cPassword' value={credentials.cPassword} onChange={onChange} placeholder="Confirm password"></input>
                    </div>

                    <button type="submit " className="btn btn-primary my-3">Submit</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Signup;
