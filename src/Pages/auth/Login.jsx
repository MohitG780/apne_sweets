import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartState } from '../../App';
import './login.css';
import userData from '../../Assests/data/userData.json';

const Login = () => {
    const navigate = useNavigate();
    const { setLogged, setOpenSnack, setUserName } = CartState();
    const [login, setLogin] = useState({ email: "", pass: "" });

    const log = (e) => {
        e.preventDefault();

        if (login.email.toLowerCase() === "" || login.pass.toLowerCase() === "") {
            setOpenSnack({ open: true, html: `Please fill all the fields !!`, severity: "error", time: "1500" })
        } else {
            userData.forEach((val) => {
                if (val.email.toLowerCase() === login.email.toLowerCase() && val.pass.toLowerCase() === login.pass.toLowerCase()) {
                    setLogged(true);
                    setUserName(`${val.uname}`);
                    const time = setTimeout(() => {
                        navigate('/menu');
                        setOpenSnack({ open: true, html: `Welcome ${val.uname}` })
                    }, 1500);
                    time();
                    setLogin({ email: "", pass: "" });
                } else {
                    setOpenSnack({ open: true, html: `No matching user found! Please try again.`, severity: "error", time: "1500" })
                }
            })
        }
    }

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    return (
        <div className="bgImage">
            <div id="registerContainer">
                <h1>Log In</h1>

                <form id='registerForm' onSubmit={log}>
                    <div>
                        <h3>Email-Id</h3>
                        <input 
                            type='email' 
                            placeholder='email@abc.com' 
                            required 
                            name='email' 
                            onChange={handleChange} 
                        />

                        <h3>Password</h3>
                        <input 
                            type='password' 
                            placeholder='password' 
                            required 
                            name='pass' 
                            onChange={handleChange} 
                        />

                        <button type='submit'> Login </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
