import "./Footer.css"
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const Footer = () => {

    let navigate = useNavigate();
    const handleNavigate = (path) => { navigate(path) }

    return(
        <footer>
            <div className="footer-content bg-dark">
                <h3>Marvel</h3>
                <ul className="nav">
                    <li><Button color="inherit" onClick={() => handleNavigate('/')}>Home</Button></li>
                    <li><Button color="inherit" onClick={() => handleNavigate('/superheroes')}>Super Heroes</Button></li>
                    <li><Button color="inherit" onClick={() => handleNavigate('/comics')}>Comics</Button></li>
                </ul>
                <p>copyright &copy;2021 marvel_Api. designed by <span>jsanv.dev</span></p>
            </div>
        </footer>
    );

}

export default Footer