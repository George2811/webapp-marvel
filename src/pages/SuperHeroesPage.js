import { Box } from "@material-ui/core";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import Paginator from "../components/Paginator";
import { helpHttp } from "../helpers/helpHttp";

const initialHerores= [
    {
        "id": 1010354,
        "name": "Adam Warlock",
        "description": "Adam Warlock is an artificially created human who was born in a cocoon at a scientific complex called The Beehive.",
        "modified": "2013-08-07T13:49:06-0400",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/a/f0/5202887448860",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1010354"       
    },
    {
        "id": 17,
        "name": "Adam Warlock",
        "description": "Adam Warlock is an artificially created human who was born in a cocoon at a scientific complex called The Beehive.",
        "modified": "2013-08-07T13:49:06-0400",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/a/f0/5202887448860",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1010354"       
    },
    {
        "id": 18,
        "name": "Adam Warlock",
        "description": "Adam Warlock is an artificially created human who was born in a cocoon at a scientific complex called The Beehive.",
        "modified": "2013-08-07T13:49:06-0400",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/a/f0/5202887448860",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1010354"       
    },
    {
        "id": 19,
        "name": "Adam Warlock",
        "description": "Adam Warlock is an artificially created human who was born in a cocoon at a scientific complex called The Beehive.",
        "modified": "2013-08-07T13:49:06-0400",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/a/f0/5202887448860",
          "extension": "jpg"
        },
        "resourceURI": "http://gateway.marvel.com/v1/public/characters/1010354"       
    },
    {
        "id": 1010846,
        "name": "Aegis (Trey Rollins)",
        "description": "",
        "modified": "1969-12-31T19:00:00-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/5/e0/4c0035c9c425d",
          "extension": "gif"
        },
    },
    {
        "id": 20,
        "name": "Aegis (Trey Rollins)",
        "description": "",
        "modified": "1969-12-31T19:00:00-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/5/e0/4c0035c9c425d",
          "extension": "gif"
        },
    },
    {
        "id": 25,
        "name": "Aegis (Trey Rollins)",
        "description": "",
        "modified": "1969-12-31T19:00:00-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/5/e0/4c0035c9c425d",
          "extension": "gif"
        },
    },
    {
        "id": 29,
        "name": "Aegis (Trey Rollins)",
        "description": "",
        "modified": "1969-12-31T19:00:00-0500",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/5/e0/4c0035c9c425d",
          "extension": "gif"
        },
    },
    {
        "id": 100,
        "name": "Agatha Harkness",
        "description": "",
        "modified": "2021-08-06T11:30:56-0400",
        "thumbnail": {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/c/a0/4ce5a9bf70e19",
          "extension": "jpg"
        },
    }
]

const SuperHeroesPage = () => {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    
    let url = `https://gateway.marvel.com:443/v1/public/characters?limit=20&offset=${offset}&apikey=7731c14827d6b11928ab689603159fa5`;

    useEffect(() => {
        setLoading(true)
        helpHttp().get(url).then((res) => {
            if(!res.err){
                setHeroes(res.data.results);
            } else {
                setHeroes(null);
            }
            setLoading(false);      
        });
    }, [url]);
    

    return (
        <>
            <Box className='search-container'>
                <h2>Searcher ... </h2>
                <Paginator setOffset={setOffset} />
            </Box>
            <div className="cards-container">
                {loading && <Loader />}
                {
                   heroes !== null ?
                   heroes.map((e) => <Card key={e.id} name={e.name} img={e.thumbnail.path} ext={e.thumbnail.extension} ></Card>)
                   :
                   <h4>An error ocurred, try it later :(</h4>
                }  
            </div>
        </>
    );
}

export default SuperHeroesPage;