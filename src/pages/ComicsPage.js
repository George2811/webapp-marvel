import { Box } from "@material-ui/core";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Paginator from "../components/Paginator";
import Searcher from "../components/Searcher";
import { helpHttp } from "../helpers/helpHttp";

const ComicsPage = () => {
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nameSearch, setNameSearch] = useState('');
    const [offset, setOffset] = useState(0);

    
    useEffect(() => {
        let url = `https://gateway.marvel.com:443/v1/public/comics?limit=20&offset=${offset}&apikey=7731c14827d6b11928ab689603159fa5`;
        const searched = nameSearch ? `${url}&titleStartsWith=${nameSearch}` : url;
        setLoading(true);

        helpHttp().get(searched).then((res) => {
            if(!res.err && res.data.results.length){
                setComics(res.data.results);
            } else {
                setComics(null);                
            }
            setLoading(false);
        });        
    }, [nameSearch, offset]);

    return(
        <>
            <Box className='search-container'>                
                <Searcher nameSearch={nameSearch} setNameSearch={setNameSearch} />
                <Paginator setOffset={setOffset} />
            </Box>
            <div className="cards-container">
                {loading && <Loader />}
                {
                comics !== null ?                
                comics.map((e) => <Card key={e.id} id={e.id} name={e.title} img={e.thumbnail.path} ext={e.thumbnail.extension} isHeroe={false} ></Card>)
                :
                <div className="error-container">
                    <h3>No comics available, maybe later :)</h3>
                </div>
                }  
            </div>
        </>
    );
}

export default ComicsPage