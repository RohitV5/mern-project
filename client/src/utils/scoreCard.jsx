import React from "react";

import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Chip } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import PersonIcon from "@material-ui/icons/Person";
import StarIcon from "@material-ui/icons/Star";

const ScoreCard = ({current}) =>{

    return(
        <List className="scorecard">
            {/* {score} */}
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <StarIcon></StarIcon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Our score" secondary={current.score}
                    className="rating"        
                >
                </ListItemText>
            </ListItem>

            <Divider variant="inset" component="li"></Divider>   

            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon></PersonIcon>
                    </Avatar>
                </ListItemAvatar>
                <div>
                    {current.actors.map(( item,index)=>(
                        <Chip 
                            key={`${index+item}`}
                            item={item}
                            label={item}
                            clickable
                            color="primary"
                            className="chip"                       
                        >
                        </Chip>
                    ))
                }
                </div>
            </ListItem>    

            <Divider variant="inset" component="li"></Divider>   

            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <MovieIcon></MovieIcon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Director" secondary={current.director}></ListItemText>
            </ListItem>         

        </List>
    )
}

export default ScoreCard;