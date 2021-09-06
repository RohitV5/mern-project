import React from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
export const PreventAuthRoute = (props) =>{

    //getting user from redux store
    const users = useSelector(state=> state.users);

    return(
        <>
            {users.auth?
                <Redirect to="/dashboard" />
            :
                props.children
            }

        </>
    )
}