// No context needed, just a page with links to shop headers

import Header from '../Header/Header.jsx'
import { Link } from 'react-router-dom'
import Logo from '../../assets/banner-logo.svg'
import HomeImg from '../../assets/home.png'
import BeautyImg from '../../assets/beauty.png'
import TechImg from '../../assets/tech.png'
import './Home.css'

export default function Home() {
    window.scrollTo(0, 0)
    return (
        <>
            <Header />
            <div id="home-container">
                <div id="store-banner">
                    <img src={Logo}/>
                </div>
                <div className="home-row">
                    <div className="home-image-block" style={{backgroundImage:`url(${TechImg})`}}></div>
                    <div className="home-text-block">
                        <h3>We got stuff for evading ennui</h3>
                        <p>You need one of a few specific cell phones or laptops? 
                            Ones that are a little bit outdated, but still perfectly
                             fine to use? Looking to flex on your friends with a kind 
                             of mobile keyboard that hasn't been seen since the abrupt 
                             ubiquity of touchscreens? Do your needs vis a vis processing 
                             power and graphical fidelity not exceed what was already 
                             middling several years ago? We've got you covered.</p>
                        <Link to='/store'><button>Shop now!</button></Link>
                    </div>
                </div>
                <div className="home-row">
                    <div className="home-testimonial-block">
                        <p>"When I arrived at this very real storefront, I was 
                        frankly amazed at how veritably existent it was! What
                        a treat to browse their many products."</p>
                        <p>- Rick Rollman</p>
                    </div>
                    <div className="home-testimonial-block">
                    <p>"I have purchased literally every item I have ever owned
                        from this store, and given its recently coming into being,
                        I'd posit that that's a huge deal."</p>
                        <p>- Fack Tchual</p>
                    </div>
                    <div className="home-testimonial-block">
                    <p>"Roughly fifteen hundred years ago, this shop caused the 
                        downfall of the Roman empire. To say it has impacted 
                        history is a colossal understatement."</p>
                        <p>- Rea L'Dame</p>
                    </div>
                </div>
                <div className="home-row">
                    <div className="home-text-block">
                        <h3>We got stuff for your house</h3>
                        <p>Do you want one of five very specific groceries, beacuse 
                            you are ordinarily overwhelmed with choice and would 
                            simply rather have choices made for you, and poorly at 
                            that? Maybe a bizarre selection of knick knacks to put... 
                            I don't know, on that barren coffee table or something? 
                            You guessed it: we got you. 
                        </p>
                        <Link to='/store'><button>Shop now!</button></Link>
                    </div>
                    <div className="home-image-block" style={{backgroundImage:`url(${HomeImg})`}}></div>
                </div>
                <div className="home-row">
                    <div className="home-image-block" style={{backgroundImage:`url(${BeautyImg})`}}></div>
                    <div className="home-text-block">
                        <h3>We got beauty products</h3>
                        <p>In this modern day and age, there are simply too many products 
                            meant to augment the softness of your skin, ameliorate the 
                            natural results of aging, and give the people around you 
                            a pleasant if overpowering olfactory experience. Let us show you 
                            what the REAL good stuff is.
                        </p>
                        <Link to='/store'><button>Shop now!</button></Link>
                    </div>
                </div>
               
            </div>
        </>
    )
}