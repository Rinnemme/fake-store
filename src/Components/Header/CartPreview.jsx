// A small window with a scrollable list of cart items, and buttons to go to cart or checkotu

import CartLogo from '../../assets/cart.png'
import { useState, useContext } from 'react'
import { StoreContext } from '../App.jsx'
import { Link } from 'react-router-dom'

export default function CartPreview() {
    const context = useContext(StoreContext)
    const cartItems = context.cartItems
    const [CartVisible, setCartVisible] = useState(false)
    let cartTotal = 0
    cartItems.forEach(item => cartTotal = cartTotal+(item.price * item.quantity))

    function toggleCartVisibility() {
        if (CartVisible === false) setCartVisible(true)
        else setCartVisible(false)
    }

    return (
        <>
            <img src={CartLogo} onClick={() => toggleCartVisibility()}/>
            {CartVisible && <div id="cart-preview-container" onMouseLeave={() => setCartVisible(false)}>
                <div id="cart-preview">
                    <div id="mini-cart-banner">In Your Cart:</div>
                    <div id="mini-cart">
                        {cartItems.length===0 && <div><em>There are no items in your cart.</em></div>}
                        {cartItems.map(item=>{
                            return (
                                <div className="mini-cart-item">
                                    <img src={item.thumbnail}/>
                                    <div className="mini-cart-item-name">{`${item.title} (${item.quantity})`}</div>
                                    <div className="mini-cart-item-total">{`$${item.price * item.quantity}`}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div id="mini-cart-total">
                        <div>Total:</div>
                        <div>{`$${cartTotal}`}</div>
                    </div>
                    <div id="mini-cart-buttons">
                        <Link to='/cart'><button id="left-mini-cart-button">To Cart</button></Link>
                        <Link to='/checkout'><button id="right-mini-cart-button">To Checkout</button></Link>
                    </div>
                </div>
            </div>
            }
        </>
    )
}