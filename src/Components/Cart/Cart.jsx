import Header from '../Header/Header.jsx'
import { useContext } from 'react'
import { StoreContext } from '../App.jsx'
import { Link } from 'react-router-dom'
import './Cart.css'

export default function Cart() {
    if(!window.location.href.includes('cart')) window.scrollTo(0, 0)
    const context = useContext(StoreContext)
    const cartItems = context.cartItems
    const updateQuantity = context.updateQuantity
    const removeFromCart = context.removeFromCart
    let cartTotal = 0
    cartItems.forEach(item => cartTotal+=(item.price * item.quantity))

    return (
        <>
            <Header />
            <div id="cart-container">
                <div id="cart-main">
                    <div id="cart-header">
                        <p>Your Cart</p>
                        <div id="cart-total">
                            <p>{`Total: $${cartTotal}`}</p>
                            <Link to='/checkout'><button>Checkout</button></Link>
                        </div>
                    </div>
                    <div id="cart-contents">
                        {cartItems.length===0 && <p style={{textAlign:'center'}}>Nothing in the cart!</p>}
                        {cartItems.map(item => {
                            return (
                                <div key={item.id} className="cart-item-row">
                                        <div className="cart-item-image" style={{backgroundImage:`url(${item.thumbnail})`}}/> 
                                    <div className="cart-item-info">
                                        <div className="name-and-price">
                                            <div className="cart-item-name">{`${item.title}`}</div>
                                            <div className="cart-item-price">{`$${item.price}`}</div>
                                        </div>
                                        <div className="cart-item-quantity-section">
                                            <div>Qty:</div>
                                            <input 
                                                type="number" 
                                                max="5" 
                                                min="1" 
                                                value={item.quantity}
                                                onChange={(e) => {updateQuantity(item, e.target.value)}}
                                            ></input>
                                            <button className="remove-from-cart-button" onClick={() => removeFromCart(item)}></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}