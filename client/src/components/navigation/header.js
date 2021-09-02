import React from "react";
import {Link, withRouter} from 'react-router-dom';
import SideDrawer from './sideNavigation';


const Header = (prop) =>{


        console.log(prop)

    

    return(
        <>
            <nav className="navbar fixed-top">
                <Link style={{fontFamily:"Fredoka One"}} to="/" className="navbar-brand d-flex align-items-center" >
                    FlickBase
                </Link>
                <SideDrawer/>
            </nav>
            

        </> 
    )
}

//withrRouter will inject the prop which we need in header as header is outside the router
export default withRouter(Header);