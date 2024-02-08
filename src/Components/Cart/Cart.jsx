import Header from '../Header/Header.jsx'
import { useContext } from 'react'
import { StoreContext } from '../App.jsx'
import { Link } from 'react-router-dom'
import './Cart.css'

export default function Cart() {
    if(!window.location.href.includes('cart')) window.scrollTo(0, 0)
    const context = useContext(StoreContext)
    const cartItems = context.cartItems
    const updateCart = context.updateCart
    let cartTotal = 0
    cartItems.forEach(item => cartTotal+=(item.price * item.quantity))

    function updateQuantity(item) {
        const newCart = []
        cartItems.forEach(item => newCart.push({...item}))
        const itemInCart = newCart.find(match=>match.title===item.title)
        itemInCart.quantity = document.getElementById(`${item.title}-cart-quantity`).value
        updateCart(newCart)
    }

    function removeFromCart(item) {
        const newCart = []
        cartItems.forEach(item => newCart.push({...item}))
        const itemIndex = newCart.indexOf(newCart.find(match=>match.title===item.title))
        newCart.splice(itemIndex,1)
        updateCart(newCart)
    }

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
                                            <input id={`${item.title}-cart-quantity`} type="number" max="5" min="1" defaultValue={item.quantity}></input>
                                            <button onClick={() => updateQuantity(item)}>Update</button>
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