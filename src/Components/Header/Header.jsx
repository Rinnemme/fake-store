import './Header.css'
import './HamburgerMenu.css'
import './CartPreview.css'
import HamburgerMenu from './HamburgerMenu.jsx'
import CartPreview from './CartPreview.jsx'
import Logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div id="store-header">
            <HamburgerMenu />
            <Link to='/'><img id="logo" src={Logo}/></Link>
            <CartPreview />
        </div>
    )
}