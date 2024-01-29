// Hamburger icon, logo, cart icon, little number (next to cart) with cart length
// hamburger and cart should, when clicked, render a list of links & a cart preview respectively

import './Header.css'
import './HamburgerMenu.css'
import './CartPreview.css'
import HamburgerMenu from './HamburgerMenu.jsx'
import CartPreview from './CartPreview.jsx'
import Logo from '../../assets/logo.svg'

export default function Header() {
    return (
        <div id="store-header">
            <HamburgerMenu />
            <img id="logo" src={Logo}/>
            <CartPreview />
        </div>
    )
}