import React, { useEffect, useState } from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import GoogleFontLoader from 'react-google-font-loader';
import Home from './components/home';
import Header from './components/navigation/header';
import MainLayout from './components/hoc/mainLayout';
import Auth from './components/auth';
import Dashboard from './components/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthUser } from './store/actions/user_actions';
import Loader from './utils/loader';
import Profile from './components/dashboard/profiles';
import Articles from './components/dashboard/articles';
import authGaurd from './components/hoc/authGaurd';
import Article from './components/articles';
import AddArticle from './components/dashboard/articles/add';

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
            {loading ? 
            <Loader></Loader>
            :
            <MainLayout> 
                <Switch>
                    {/* ordering of routes matter  */}
                    <Route path="/dashboard/articles/add" component={authGaurd(AddArticle)} />
                    <Route path="/dashboard/articles" component={authGaurd(Articles,true)} />
                    <Route path="/dashboard/profile" component={authGaurd(Profile)} />
                    <Route path="/dashboard" component={authGaurd(Dashboard)} />
                    
                    <Route path="/article/:id" component={Article} />
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