import { Card, CardContent, CardMedia, IconButton, Tooltip, Typography } from "@material-ui/core";
import { MenuBookOutlined,  NoteOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "../components/Loader";


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
            height: 260,
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

const ComicsDetailsPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const url = 'https://gateway.marvel.com:443/v1/public/comics/91992?apikey=7731c14827d6b11928ab689603159fa5';

    useEffect(() => {
        setLoading(true);

        helpHttp().get(url).then((res) => {
            if(!res.err && res.data.results){
                setData(res.data.results[0]);          
                console.log(res.data.results[0]);          
            } else {
                setData(null);                
            }
            setLoading(false);
        });        
    }, []);

    const goTo = (link) => {
        window.location.replace(link);
    } 

    // TODO: Creatonrs info
    //Options: More comics by the creator, 

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
                    {data.title}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                    {
                    data.description || `It's so epic that there are no words to describe it 🤯, mayble later.`
                    }
                    </Typography>
                    
                    <div className={classes.icons}>
                        <Tooltip title="More info">
                            <IconButton color="secondary" aria-label="Info" className={classes.icon} onClick={() => goTo(data.urls[0].url)} >
                                <MenuBookOutlined />
                            </IconButton>
                        </Tooltip>                            
                        <Tooltip title={data.pageCount + ' pages'}>
                            <IconButton color="secondary" aria-label="Pages" className={classes.icon} >
                                <NoteOutlined />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Buy It">
                            <IconButton color="secondary" aria-label="Appearances" className={classes.icon} onClick={() => goTo(data.urls[1].url)} >
                                <ShoppingCartOutlined />
                            </IconButton>
                        </Tooltip>                    
                    </div>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
                        Creator(s):
                    {
                    data.creators.available > 0 ? data.creators.items.map(e => ` ${e.name} `) : ` It´s a mistery 🧐`
                    }
                    </Typography>

                </CardContent>   
            </Card>
            :
            <div className="error-container">            
                <h2>There´s no info about the comic yet</h2><p>😢</p>
            </div>
            }
        </div>
    );

}

export default ComicsDetailsPage