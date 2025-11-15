import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { CartState } from '../../App';
import data from '../../Assests/data/userData.json';

const SignIn = () => {
    const navigate = useNavigate();
    const { setLogged, setUserName, setOpenSnack } = CartState();

    const log = (e) => {
        var flag = true;
        e.preventDefault();

        const emailLog = document.querySelector("#emailSign").value;
        const passlogin = document.querySelector("#signPass").value;
        const resignPass = document.querySelector("#resignPass").value;
        const uname = document.querySelector('#signUname').value;
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (passlogin !== resignPass) {
            setOpenSnack({ open: true, html: `Re entered password didn't matched.`, severity: "error", time: "1500" })
            flag = false;
        }
        if (passlogin === "") {
            setOpenSnack({ open: true, html: `Password can't be empty.`, severity: "error", time: "1500" })
            flag = false;
        }
        if (passlogin < 4) {
            setOpenSnack({ open: true, html: `Password should be length greater than 3.`, severity: "error", time: "1500" })
            flag = false;
        }
        if (uname === "") {
            setOpenSnack({ open: true, html: `User Name can't be empty`, severity: "error", time: "1500" })
            flag = false;
        }
        if (uname < 3) {
            setOpenSnack({ open: true, html: `username length greater than 3.`, severity: "error", time: "1500" })
            flag = false;
        }
        if (validRegex.test(emailLog) === false) {
            setOpenSnack({ open: true, html: `Please enter a valid email.`, severity: "error", time: "1500" })
            flag = false;
        }

        if (flag) {
            const obj = { uname: uname, email: emailLog, pass: passlogin };
            data.push(obj);

            document.querySelector("#emailSign").value = '';
            document.querySelector("#signPass").value = '';
            document.querySelector("#resignPass").value = '';
            document.querySelector('#signUname').value = '';

            setLogged(true)
            setUserName(`${uname}`)
            navigate('/menu');
            setOpenSnack({ open: true, html: `Welcome ${uname}`, severity: "success", time: "1000" })
        }
    }

    return (
        <div className="bgImage">
            <div id='registerContainer'>
                <h1>Register</h1>

                <form id='registerForm'>
                    <div>
                        <h3>Email-Id</h3>
                        <input type='email' placeholder='email@abc.com' required id='emailSign' />

                        <h3>User Name</h3>
                        <input type='text' placeholder='username' required id='signUname' />

                        <h3>Password</h3>
                        <input type='password' placeholder='password' required id='signPass' />

                        <h3>Re-Enter Password</h3>
                        <input type='password' placeholder='password' required id='resignPass' />

                        <button onClick={log}> Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn;
