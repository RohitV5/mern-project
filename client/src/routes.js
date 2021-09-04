import React, { useEffect, useState } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import GoogleFontLoader from 'react-google-font-loader';
import Home from './components/home';
import Header from './components/navigation/header';
import MainLayout from './components/hoc/mainLayout';
import Auth from './components/auth';

import { useDispatch, useSelector } from 'react-redux';
import { isAuthUser } from './store/actions/user_actions';

const Routes = () => {
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(isAuthUser())
    },[dispatch])


    const users = useSelector(state => state.users);

    useEffect(()=>{
        if(users.auth !== null){
            setLoading(false)
        }
    },[users])


    return (
        <BrowserRouter>
            <Header/>
            {/* MainLayout is a hoc component, that is it will render things iside it as they are */}
            {loading ? <>
            LOADING
            </>:
            <MainLayout> 
                <Switch>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </MainLayout>
            }

            <GoogleFontLoader
                fonts={[
                    {
                    font: 'Roboto',
                    weights: [300, 400,900],
                    },
                    {
                    font: 'Fredoka One'
                    },
                ]}
            />
        </BrowserRouter>
        
    )
}

export default Routes;