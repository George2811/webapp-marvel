import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardComponent from "../components/Card"
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {  IconButton, Tooltip } from '@material-ui/core';
import {  GroupWorkOutlined, MenuBookOutlined } from '@material-ui/icons';
import { helpHttp } from '../helpers/helpHttp';
import Loader from '../components/Loader';
import CardsSection from '../components/CardsSection';
import { useParams } from 'react-router-dom';

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
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=7731c14827d6b11928ab689603159fa5`;
    let comicsUrl = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?orderBy=modified&limit=8&apikey=7731c14827d6b11928ab689603159fa5`;

    useEffect(() => {
        setLoading(true);

        helpHttp().get(url).then((res) => {
            if(!res.err && res.data.results){
                setData(res.data.results[0]);          
     
            } else {
                setData(null);                
            }
            setLoading(false);
        });        
    }, [url]);

    useEffect(() => {
        setLoading(true);

        helpHttp().get(comicsUrl).then((res) => {
            if(!res.err && res.data.results.length){
                setComics(res.data.results);          
         
            } else {
                setComics(null);                
            }
            setLoading(false);
        });        
    }, [comicsUrl]);

    const goTo = (link) => {
        window.location.replace(link);
    }    
    // Note: Data value in the begginig must be null, for that reason in the conditional below you use null.
    // If you initialize data as an emty object {}, react produced an error, because you didn´t define the properties ({} !== null)
    // Recomendation: Never use {} as the initial value for a state
    return(
        <div>
            {loading && <Loader />}
            { data !== null ?

            <Card className={classes.root}>

                <CardMedia
                className={classes.media}
                image={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                title="Heore"
                />

                <CardContent className={`${classes.textContent}`}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.text}>
                        {data.name}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                        {
                            data.description || `This hero remains a mistery, click More info`
                        }
                    </Typography>

                    <div className={classes.icons}>
                        <Tooltip title="More info">
                            <IconButton color="secondary" aria-label="Info" className={classes.icon} onClick={() => goTo(data.urls[0].url)} >
                                <MenuBookOutlined />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Appearances">
                            <IconButton color="secondary" aria-label="Appearances" className={classes.icon} onClick={() => goTo(data.urls[1].url)} >
                                <GroupWorkOutlined />
                            </IconButton>
                        </Tooltip>
                    </div>

                </CardContent>   
            </Card>
            :
            <div className="error-container">            
                <h2>There´s no info about the heroe yet</h2><p>😢</p>
            </div>
            }
            {
                comics &&
                <CardsSection big={comics.length>4} title="Some comics" emoji="📚" >
                    {comics.map((e) => <CardComponent key={e.id} id={e.id} name={e.title} img={e.thumbnail.path} ext={e.thumbnail.extension} isHeroe={false} ></CardComponent>)}
                </CardsSection>
            }
        </div>
    );

}

export default SuperHeroeDetailsPage