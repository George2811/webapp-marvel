import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    margin: 10
  }
}));

const NavBar = () => {

  const classes = useStyles();
  let navigate = useNavigate();

  const handleNavigate = (path) => { navigate(path) }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className='bg-dark'>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} color="secondary">
            Wiki-Marvel
          </Typography>
          
          <Button className={classes.btn} color="inherit" onClick={() => handleNavigate('/')}>Home</Button>
          <Button className={classes.btn} color="inherit" onClick={() => handleNavigate('/superheroes')}>Super Heroes</Button>
          <Button className={classes.btn} color="inherit" onClick={() => handleNavigate('/comics')}>Comics</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar