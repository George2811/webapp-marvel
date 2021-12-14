import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const heroesUseStyles = makeStyles({
  root: {
    width: 210,
    height: 312,
  },
  media: {
    width:210,
    minHeight: 212,
    maxHeight: 242,
  },
  textContent: {
    minHeight: 312,
  }
});
const comicsUseStyles = makeStyles({
  root: {    
    height: 312,
    width: 210,
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    minHeight: 110, 
    maxHeight: '100%',    
  },
  textContent: {    
    height: '100%',
  }
});

const MediaCard = ({name, img, ext, isHeroe=true}) => {
  const classes = isHeroe? heroesUseStyles() : comicsUseStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${img}.${ext}`}
          title="Super Heroe"
        />
        <CardContent className={`${classes.textContent} bg-dark`}>
          <Typography gutterBottom variant="h6" component="h2">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>      
    </Card>
  );
}

export default MediaCard