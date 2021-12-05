import React from 'react'
import '../Style/navbar.css'
import {AiOutlineBell} from 'react-icons/ai'

export const Navbar = () => {
    return (
        
            <header> 
                <div>

                </div>
                <div className="user">
                   
                    <div className="bell">
                        <AiOutlineBell/>
                    </div>
                    <div className="profile">
                        <img src="" alt="" />
                        <p>Profile</p>
                    </div>
                </div>
            </header>
            
       
    )
}
