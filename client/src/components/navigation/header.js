import React, {useEffect} from "react";
import {Link, withRouter} from 'react-router-dom';
import SideDrawer from './sideNavigation';
import { showToast } from "../../utils/tools";
import { useSelector, useDispatch } from "react-redux";
import {clearNotification} from '../../store/actions/index';

const Header = (prop) =>{
    //to subscribe to store we use UseSelector    
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(notifications && notifications.error){
            const msg = notifications.msg ? notifications.msg : "Error";
            showToast('ERROR', msg);
            dispatch(clearNotification());

        }
        if(notifications && notifications.success){
            const msg = notifications.msg ? notifications.msg : "Success";
            showToast('SUCCESS', msg);
            dispatch(clearNotification());
            

        }
    },[notifications, dispatch])

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