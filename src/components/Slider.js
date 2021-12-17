import "./Slider.css"
const Slider = () => {
    const imgs = [
        'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://image.winudf.com/v2/image/Y29tLmxpdGVhcHBzLm1hcnZlbHdhbGxwYXBlcl9zY3JlZW5fMF8xNTI1NjgwNzQ3XzAyNw/screen-0.jpg?fakeurl=1&type=.jpg',
        'https://image.shutterstock.com/shutterstock/photos/1766092328/display_1500/stock-photo-valence-france-june-tapestry-with-the-marvel-superhero-comics-captain-america-iron-1766092328.jpg'

    ]

    return(
        <div className="container">  
            <ul className="slider">
                <li id="slide1">
                    <img src={imgs[0]} alt="img1"/>
                </li>
                {/*<li id="slide2">
                    <img src={imgs[1]} alt="img2"/>
                </li>
                <li id="slide3">
                    <img src={imgs[2]} alt="img1"/>
    </li>
            </ul>            
            <ul className="menu">
                <li>
                    <a href="#slide1">1</a>
                </li>
                <li>
                    <a href="#slide2">2</a>
                </li>
                <li>
                    <a href="#slide3">3</a>
                </li>*/}
            </ul>
        
      </div> 
    );

}

export default Slider