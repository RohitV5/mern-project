import React, {useEffect, useState} from "react";
import {Link, withRouter} from 'react-router-dom';
import SideDrawer from './sideNavigation';
import { showToast } from "../../utils/tools";
import { useSelector, useDispatch } from "react-redux";
import {clearNotification} from '../../store/actions/index';
import { signOut } from "../../store/actions/user_actions";
import { appLayout } from "../../store/actions/site_actions";


const Header = (prop) =>{

    const  [layout, setLayout] = useState('');
    //to subscribe to store we use UseSelector    
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();

    const users = useSelector(state=>state.users);

    //function to be called from children
    const signOutUser = () =>{
        dispatch(signOut());
        prop.history.push('/');
        
    }

    //will fire on every router path change
    useEffect(()=>{
        let pathArray = prop.location.pathname.split('/');
        
        if(pathArray[1] === 'dashboard'){
            //load dashboard layout
            setLayout('dash_layout')
            dispatch(appLayout('dash_layout'));


        }else{
            //load main layyout
            setLayout('');
            dispatch(appLayout(''));

        }
    },[prop.location.pathname,dispatch])

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
            <nav className={`navbar fixed-top ${layout}`}>
                <Link style={{fontFamily:"Fredoka One"}} to="/" className="navbar-brand d-flex align-items-center" >
                    FlickBase
                </Link>
                <SideDrawer users={users} functionForSignOut={signOutUser}/>
            </nav>
            

        </> 
    )
}

//withrRouter will inject the prop which we need in header as header is outside the router
export default withRouter(Header);