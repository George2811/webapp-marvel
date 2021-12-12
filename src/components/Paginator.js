import React from 'react';
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      color: '#fff'
    },
  },
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff"
    }
  }
}));

const Paginator = ({setOffset}) => {
  const [page, setPage] = useState(1);
  const classes = useStyles();

  const handleChange = (event, value) => {
    let newOffset = (value - 1)*20;
    setPage(value);
    setOffset(newOffset);
  }

  return (
    <div className={classes.root}>
      <Pagination count={40} shape="rounded" color='secondary' classes={{ ul: classes.ul }} page={page} onChange={handleChange} />
    </div>
  );

}

export default Paginator
