import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    }
}));

const Searcher = ({ nameSearch, setNameSearch }) => {    
    const classes = useStyles();

    const handleChange = (e) => {
        setNameSearch(e.target.value);
    }

    return(
        <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <SearchOutlined />                    
                </Grid>             
                <Grid item>
                    <TextField                            
                            id="input-with-icon-grid"
                            label="Search"
                            color='secondary'
                            inputProps={{style:{color: 'white',  borderBottom: '2px solid white'}}}
                            onChange={handleChange}
                            value={nameSearch}
                    />
                </Grid>
            </Grid>
      </div>
    );
}

export default Searcher