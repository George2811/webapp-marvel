import { Card, CardContent, CardMedia, IconButton, Tooltip, Typography } from "@material-ui/core";
import { MenuBookOutlined,  NoteOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "../components/Loader";
import CardsSection from "../components/CardsSection";
import CardComponent from "../components/Card";
import { useParams } from "react-router-dom";

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
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    let url = `https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=7731c14827d6b11928ab689603159fa5`;
    
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
        if (data === null) return;
        if (data.creators.available<1) return;

        setLoading(true);
        let idCreator = data.creators.items[0].resourceURI.slice(45);        
        helpHttp().get(`https://gateway.marvel.com/v1/public/creators/${idCreator}/comics?limit=8&apikey=7731c14827d6b11928ab689603159fa5`).then((res) => {
            if(!res.err && res.data.results.length) {
                setCreators(res.data.results);
            } 
            setLoading(false);
        });
    }, [data]);

    const goTo = (link) => {
        window.location.replace(link);
    } 

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
                    data.description || `It's so epic that there are no words to describe it 🤯, maybe later.`
                    }
                    </Typography>
                    
                    <div className={classes.icons}>
                        <Tooltip title="More info">
                            <IconButton color="secondary" aria-label="Info" className={classes.icon} onClick={() => goTo(data.urls[0].url)} >
                                <MenuBookOutlined />
                            </IconButton>
                        </Tooltip>                            
                        <Tooltip title={data.pageCount>0? `${data.pageCount} pages`: '? pages'}>
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
            {
                creators.length > 0 && 
                <CardsSection big={creators.length>4} title="Made by the creator" emoji="✏️" >
                    {creators.map((e) => <CardComponent key={e.id} id={e.id} name={e.title} img={e.thumbnail.path} ext={e.thumbnail.extension} isHeroe={false} ></CardComponent>)}
                </CardsSection>
            }
        </div>
    );

}

export default ComicsDetailsPage