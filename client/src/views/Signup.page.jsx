
import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import '../components/Style/Signup.style.css'
import { Navbar } from '../components/jsx components/nav'
export const Signup = () => {
    const navigate = useNavigate()
    // eslint-disable-next-line
     const [email, setEmail] = useState('')
     // eslint-disable-next-line
    const [password, setPassword] = useState('')
    // eslint-disable-next-line
    const [name, setName] = useState('')
    const clicked = async()=>{
        navigate("/Login");
    }
    return (


        <div className="back">
          <Navbar/>
          <br/><br/>
            <div className="text">
                <h1>Welcome to the family</h1>
                <p>let’s get you all set up so you can verify your personal account and begin settihng up your profile. </p>
            </div>
            <br/><br/>
            <div className="Mid">
                <div className="image">
                </div>
                <div className="form">
                <h2 >Let's SignUp</h2>
                    <label>Name</label>
                    <br />
                    <input
                      className="input Custom-field"
                    type="name"
                      placeholder="Your Name"
                      onChange={e => setName(e.target.value)}
                    />
                    <br />
                    <label>Enter Email</label>
                    <br />
                    <input 
                    className="input Custom-field"
                    type="email"
                      placeholder="Your Email"
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <br />
                    <label>Enter Password</label>
                    <br />
                    <input 
                     className="input Custom-field"
                     type="password"
                      placeholder="At least 8 Characters"
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <br />
                    <br />
                    <div className="checkbox">

                      <input type="checkbox" required />
                      <label>
                        I agree to the terms of service
                      </label>
                    </div>
                    <br />


                    <button 
                    className="btn"
                    type='summit' onClick={clicked}>Create account</button>
                    
                   
                </div>
            </div>
        </div>
    )
}
