import React, {useEffect, useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

import {TextField, Button, Divider} from '@material-ui/core';



import { useDispatch, useSelector } from "react-redux";
import { registerUser, signInUser } from "../../store/actions/user_actions";

const Auth = (props) =>{

    const [register, setRegister] = useState(false);

    //this is used to listen to store data
    const notifications = useSelector(state => state.notifications)

    //this is used to dispatch an action to redux store
    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues:{email:"",password:""},
        validationSchema:Yup.object({
            email:Yup.string()
            .required('Sorry the email is required')
            .email('This is not a valid email'),
            password:Yup.string()
            .required('Sorry the password is required')

        }),
        onSubmit:(values, {resetForm})=>{
            handleSubmit(values);
        }
    })

    const errorHelper = (formik,value) =>({
        error: formik.errors[value] && formik.touched[value] ? true:false,
        helperText:formik.errors[value] && formik.touched[value] ? formik.errors[value] : null
    })

    useEffect(()=>{
        if(notifications && notifications.success){
            props.history.push('/dashboard')
        }
    },[notifications, props.history])



    const handleSubmit = (values) => {        
         if(register){
            dispatch(registerUser(values));
         }else{
            dispatch(signInUser(values))
         }
    }


    return(
        <>
            <div className="auth_container">
                <h1>Authenticate</h1>
                <form className="mt-3" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <TextField 
                            style={{width:'100%'}} 
                            name="email" 
                            label="Enter your email" 
                            variant="outlined" 
                            {...formik.getFieldProps('email')}
                            {...errorHelper(formik, 'email')}

                        />

                            
                    </div>

                    <div className="form-group">
                        <TextField 
                            style={{width:'100%'}} 
                            name="password" 
                            label="Enter your password" 
                            variant="outlined" 
                            type="password"
                            autocomplete="on"
                            {...formik.getFieldProps('password')}
                            {...errorHelper(formik, 'password')}
                            

                        />

                            
                    </div>

                    <Button variant="contained" color="primary" type="submit" size="large" >
                        {register ? 'Register':'Login'}
                    </Button>

                    <Divider/>

                    <Button className="mt-3" variant="outlined" color="secondary"  size="small" onClick={()=>setRegister(!register)} >
                        Want to {!register ? 'Register':'Login'} ?
                    </Button>


                </form>

            </div>
        </>
    )
}


export default Auth;