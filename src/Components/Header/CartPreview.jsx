import CartLogo from '../../assets/cart.png'
import { useState, useContext } from 'react'
import { StoreContext } from '../App.jsx'
import { Link } from 'react-router-dom'

export default function CartPreview() {
    const [cartVisible, setCartVisible] = useState(false)
    const context = useContext(StoreContext)
    const cartItems = context.cartItems
    const updateQuantity = context.updateQuantity
    const removeFromCart = context.removeFromCart
    
    let cartTotal = 0
    cartItems.forEach(item => cartTotal = cartTotal+(item.price * item.quantity))
    
    let cartLength = 0
    cartItems.forEach(item => cartLength = cartLength + +item.quantity)

    function toggleCartVisibility() {
        setCartVisible(!cartVisible)
    }

    return (
        <>
            <img src={CartLogo} onClick={() => toggleCartVisibility()}/>
            {cartItems.length>0 && <div id="cart-counter">{`${cartLength}`}</div>}
            {cartVisible && <div id="cart-preview-container" onMouseLeave={() => setCartVisible(false)}>
                <div id="cart-preview">
                    <div id="mini-cart-banner">In Your Cart:</div>
                    <div id="mini-cart">
                        {cartItems.length===0 && <div><em>There are no items in your cart.</em></div>}
                        {cartItems.map(item=>{
                            return (
                                <div key={item.id} className="mini-cart-item">
                                    <img src={item.thumbnail}/>
                                    <div className="mini-cart-item-name">{`${item.title}`}</div>
                                    <div>{'Qty:'}</div>
                                    <input 
                                        type="number"
                                        max="5" 
                                        min="1" 
                                        value={item.quantity}
                                        onChange={(e) => {updateQuantity(item, e.target.value)}}
                                    ></input>
                                    <div className="mini-cart-item-total">{`$${item.price * item.quantity}`}</div>
                                    <button className="remove-from-cart-button" onClick={() => removeFromCart(item)}></button>
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