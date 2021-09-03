import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { 
            Card, 
            CardMedia, 
            CardContent, 
            CardActions, 
            IconButton, 
            Typography, 
            Button 
        } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';

const ArticleCard = ({article}) =>{
   return (
        <Card>
            <CardMedia style={{height:0, paddingTop:'56.25%'}} image="https://picsum.photos/200" title="some title">

            </CardMedia>
            <CardContent>
                <Typography variant="h5"> 
                    Some Titile
                </Typography>
                <Typography variant="body1" component="p"> 
                    Some title
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <FavoriteIcon>
                        
                    </FavoriteIcon>
                </IconButton>
                <Button size="small" color="primary" component={RouterLink} to={`/article/id`}>
                    View Article
                </Button>
            </CardActions>
        </Card>
    )
}

export default ArticleCard;