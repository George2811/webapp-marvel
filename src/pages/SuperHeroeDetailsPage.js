import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {  IconButton, Tooltip } from '@material-ui/core';
import {  GroupWorkOutlined, MenuBookOutlined } from '@material-ui/icons';
import { helpHttp } from '../helpers/helpHttp';

const useStyles = makeStyles({
  root: {
    maxWidth: "90%",
    margin: "3rem auto",
    padding: "2rem 1rem",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgb(15, 37, 61)",
    "@media (max-width: 600px)": {
        display: "flex",
        flexDirection: "column"
    }
  },
  media: {
      width: "60%",
      "@media (max-width: 680px)": {
          width: "90%",
          height: 240,
          margin: "auto"
      }     
  },
  textContent: {    
    height: '100%',    
    width: "70%",
    margin: "auto",
    "@media (max-width: 680px)": {
        width: "90%",        
        margin: "auto"
    } 
  },
  text: {
      color: "#fff"
  },
  icons: {
      marginTop: " .5rem",
  },
  icon: {
      marginRight: "1rem",
  }
});

const SuperHeroeDetailsPage = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        let url = `https://gateway.marvel.com:443/v1/public/characters/1017100?apikey=7731c14827d6b11928ab689603159fa5`;
        setLoading(true);

        helpHttp().get(url).then((res) => {
            if(!res.err && res.data.results.length){
                setData(res.data.results[0]);
                console.log(data);                
            } else {
                setData(null);                
            }
            setLoading(false);
        });        
    }, []);

    const goTo = (link) => {
        window.location.replace(link);
    }

    return(
        <Card className={classes.root}>
            <CardMedia
            className={classes.media}
            image="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            title="Contemplative Reptile"
            />

            <CardContent className={`${classes.textContent}`}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.text}>
                    Name
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! 
                </Typography>

                <div className={classes.icons}>
                    <Tooltip title="More info">
                        <IconButton color="secondary" aria-label="Info" className={classes.icon} onClick={() => goTo("https://www.google.com")} >
                            <MenuBookOutlined />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Appearances">
                        <IconButton color="secondary" aria-label="Appearances" className={classes.icon} onClick={() => goTo("https://www.youtube.com")} >
                            <GroupWorkOutlined />
                        </IconButton>
                    </Tooltip>
                </div>

            </CardContent>            
        </Card>
    );

}

export default SuperHeroeDetailsPage