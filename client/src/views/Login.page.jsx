import React ,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import '../components/Style/login.style.css'
import {Navbar} from '../components/jsx components/nav'

export const Login = () => {
    const navigate = useNavigate()
    // eslint-disable-next-line
    const [email,setEmail] = useState('')
    // eslint-disable-next-line
    const [password,setPassword] = useState('')
    const signin =async()=>{
        navigate('/Home')
    }
    return (
        <div className="page">
            <Navbar/>
            <br/><br/>
            <div className="text">
                <h1>Welcome to the family</h1>
                <p>let’s get you all set up so you can verify your personal account and begin settihng up your profile. </p>
            </div>
            <br/><br/>
            <div className="mid">
                    <div className="image">
                        <img src="../../layout/img.png" alt=""/>
                    </div>
                    <div className='formLogin'>
                         <h3>Let's Login</h3>
                         <label >Email</label><br/>
                        
                        <input className="Custom-field" 
                            type="email"
                            placeholder= 'email'
                            onChange={e=>setEmail(e.target.value)}
                        />
                    
                        <br/>
                        <label >Password</label><br/>
                         <input  className="Custom-field" 
                        type="password"
                        placeholder= 'password'
                         onChange = {e=>setPassword(e.target.value)}
                         /><br/>
                        <button type="summit" className="btn1" onClick={signin}> Login</button>
                    </div>
            </div>
    
            
        </div>
    )
}
