import React, {useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

import {TextField, Button, Divider} from '@material-ui/core';

const Auth = (props) =>{

    const [register, setRegister] = useState(false);


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
            console.log(values)
        }
    })

    const errorHelper = (formik,value) =>({
        error: formik.errors[value] && formik.touched[value] ? true:false,
        helperText:formik.errors[value] && formik.touched[value] ? formik.errors[value] : null
    })


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
                            {...formik.getFieldProps('password')}
                            {...errorHelper(formik, 'password')}
                            

                        />

                            
                    </div>

                    <Button variant="contained" color="primary" type="submit" size="large" >
                        {register ? 'Register':'Login'}
                    </Button>

                    <Divider/>

                    <Button className="mt-3" variant="outlined" color="secondary" type="submit" size="small" onClick={()=>setRegister(!register)} >
                        Want to {!register ? 'Register':'Login'} ?
                    </Button>


                </form>

            </div>
        </>
    )
}


export default Auth;