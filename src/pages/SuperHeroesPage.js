import { Box } from "@material-ui/core";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import Paginator from "../components/Paginator";
import Searcher from "../components/Searcher";
import { helpHttp } from "../helpers/helpHttp";

const SuperHeroesPage = () => {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nameSearch, setNameSearch] = useState('');
    const [offset, setOffset] = useState(0);
    
    
    useEffect(() => {
        let url = `https://gateway.marvel.com:443/v1/public/characters?limit=20&offset=${offset}&apikey=7731c14827d6b11928ab689603159fa5`;
        const searched = nameSearch ? `${url}&nameStartsWith=${nameSearch}` : url;
        setLoading(true);

        helpHttp().get(searched).then((res) => {
            if(!res.err && res.data.results.length){
                setHeroes(res.data.results);                
            } else {
                setHeroes(null);                
            }
            setLoading(false);
        });        
    }, [nameSearch, offset]);    

    return (
        <>
            <Box className='search-container'>                
                <Searcher nameSearch={nameSearch} setNameSearch={setNameSearch} />
                <Paginator setOffset={setOffset} />
            </Box>
            <div className="cards-container">
                {loading && <Loader />}
                {
                   heroes !== null ?
                   heroes.map((e) => <Card key={e.id} name={e.name} img={e.thumbnail.path} ext={e.thumbnail.extension} ></Card>)
                   :
                   <div className="error-container">
                       <h3>The superheroes are busy, maybe later :)</h3>
                   </div>
                }  
            </div>
        </>
    );
}

export default SuperHeroesPage;