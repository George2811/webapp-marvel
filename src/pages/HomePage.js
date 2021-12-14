import { useEffect, useState } from "react";
import CardsSection from "../components/CardsSection";
import Card from "../components/Card"
import Slider from "../components/Slider";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "../components/Loader";

const HomePage = () => {
    const [heroes, setHeroes] = useState([]);
    const [comics, setComics] = useState([]);
    const [loadingHeroes, setLoadingHeroes] = useState(false);
    const [loadingComics, setLoadingComics] = useState(false);

    const heroesUrl = 'https://gateway.marvel.com:443/v1/public/characters?orderBy=modified&limit=4&apikey=7731c14827d6b11928ab689603159fa5';
    const comicsUrl = 'https://gateway.marvel.com:443/v1/public/comics?orderBy=modified&limit=4&apikey=7731c14827d6b11928ab689603159fa5';

    useEffect(() => {        
        setLoadingHeroes(true);

        helpHttp().get(heroesUrl).then((res) => {
            if(!res.err && res.data.results.length){
                setHeroes(res.data.results);      
            } else {
                setHeroes(null);                
            }
            setLoadingHeroes(false);
        });   
        
    }, [heroesUrl]);

    useEffect(() => {        
        setLoadingComics(true);

        helpHttp().get(comicsUrl).then((res) => {
            if(!res.err && res.data.results.length){
                setComics(res.data.results);      
            } else {
                setComics(null);                
            }
            setLoadingComics(false);
        });   
        
    }, [comicsUrl]);


    return(
        <div>
            <Slider />
            {loadingHeroes && <Loader />}
            <CardsSection data={heroes} title="Last heroes in town" emoji="💥">
                {
                   heroes !== null ?
                   heroes.map((e) => <Card key={e.id} id={e.id} name={e.name} img={e.thumbnail.path} ext={e.thumbnail.extension} ></Card>)
                   :
                   <div className="error-container">
                       <h3>The superheroes are busy, maybe later :)</h3>
                   </div>
                }
            </CardsSection>

            {loadingComics && <Loader />}
            <CardsSection data={comics} title="Last comics" emoji="📚">
            {
                comics !== null ?                
                comics.map((e) => <Card key={e.id} id={e.id} name={e.title} img={e.thumbnail.path} ext={e.thumbnail.extension} isHeroe={false} ></Card>)
                :
                <div className="error-container">
                    <h3>No comics available, maybe later :)</h3>
                </div>
            }
            </CardsSection>
        </div>
    );
}

export default HomePage