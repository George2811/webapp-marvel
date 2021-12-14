import "./CardsSection.css"

const CardsSection = ({ big=false, title="Empty", emoji=" ", children }) => {
    //name, img, ext, isHeroe=true
    return(
        <div className="main-box">
            <div className="title">
                <h2>{title}</h2>
                <p>{emoji}</p> 
            </div>
            
            <div className={big?'big-cards-box':'cards-box'}>
                {children}                
            </div>            
        </div>
    );

}

export default CardsSection