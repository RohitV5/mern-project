import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {
    Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, TextField
} from '@material-ui/core'
import DehazeIcon from '@material-ui/icons/Dehaze'
import MailIcon from '@material-ui/icons/Mail'
import HomeIcon from '@material-ui/icons/Home'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import DashboardIcon from  '@material-ui/icons/Dashboard'

//passing a function in prop from parent for execution
const SideDrawer = ({users,functionForSignOut}) =>{

    const [state, setState] = useState(false);

    return(
        <>
           <DehazeIcon 
                className="drawer_btn" 
                onClick={()=> setState(true)} 
            />
            <Drawer anchor={'right'} open={state}  onClose={()=>{ setState(false)}}>

                <form style={{margin:'20px'}}>
                    <TextField id="outlined-basic" label="Search Movie" variant="outlined"/>
                </form>
                <List>
                    <ListItem button component={RouterLink} to="/" onClick={()=>setState(false)}>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary="Home"></ListItemText>
                    </ListItem>
                    <ListItem button component={RouterLink} to="/contact" onClick={()=>setState(false)}>
                        <ListItemIcon><MailIcon/></ListItemIcon>
                        <ListItemText primary="Contact"></ListItemText>
                    </ListItem>
                    
                    {!users.auth ? 
                        <ListItem button component={RouterLink} to="/auth" onClick={()=>setState(false)}>
                            <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                            <ListItemText primary="Sign In"></ListItemText>
                        </ListItem>
                        :

                        <ListItem button component={RouterLink} to="/auth" 
                            onClick={()=>{
                                functionForSignOut();
                                setState(false)
                                }
                            }>
                            <ListItemIcon><VpnKeyIcon/></ListItemIcon>
                            <ListItemText primary="Sign out"></ListItemText>
                        </ListItem> 
                    }
                    

                    
                </List>

                {users.auth ? 
                        
                        <>
                            <Divider/>
                            <List>
                                <ListItem button component={RouterLink} to="/dashboard" onClick={()=>setState(false)}>
                                    <ListItemIcon><DashboardIcon/></ListItemIcon>
                                    <ListItemText primary="Dashboard"></ListItemText>
                                </ListItem>
                            </List>
                        </>
                        :null


                }


            </Drawer>
        </>
    )
}


export default SideDrawer;