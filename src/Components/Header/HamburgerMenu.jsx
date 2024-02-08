import { useState } from 'react'
import MenuLogo from '../../assets/hamburger.png'
import { Link } from 'react-router-dom'

export default function HamburgerMenu() {
    const [menuVisible, setMenuVisible] = useState(false)

    function toggleMenuVisibility() {
        setMenuVisible(!menuVisible)
    }

    return (
        <>
            <img src={MenuLogo} onClick={() => toggleMenuVisibility()}/>
            {menuVisible && <div id="menu-container" onMouseLeave={() => setMenuVisible(false)}>
                    <div id="menu">
                        <Link to='/'>Home</Link>
                        <Link to='/store'>Store</Link>
                        <Link to='/cart'>Cart</Link>
                        <Link to='/checkout'>Checkout</Link>
                    </div>
                </div>}
         </>

    )
}