// just a form with payment info, a cart review, and a pay now button
import Header from '../Header/Header.jsx'
import { useContext } from 'react'
import { StoreContext } from '../App.jsx'
import { Link } from 'react-router-dom'
import CloseImg from '../../assets/close.svg'
import './checkout.css'

export default function Checkout() {
    window.scrollTo(0, 0)
    const context = useContext(StoreContext)
    const cartItems = context.cartItems
    let cartTotal = 0
    cartItems.forEach(item => cartTotal+=(item.price * item.quantity))
    const submitPayment = (e) => {
            e.preventDefault();
            alert("Sike! This isn't a real payment form.");
         }

    return (
        <>
            <Header />
            <div id="checkout-container">
                <form onSubmit={submitPayment}>
                    <div className="checkout-block">
                        <div className="checkout-header">Shipment Information</div>
                        <div className="form-section">
                            <div className="form-line">
                                <label htmlFor="name">Full Name: </label>
                                <input id="name" type="text"></input>
                                <label htmlFor="country">Country: </label>
                                <input id="country" type="text"></input>
                            </div>
                            <div className="form-line">
                                <label htmlFor="address">Street Address: </label>
                                <input id="address" style={{maxWidth: "300px"}} type="text"></input>
                            </div>
                            <div className="form-line">
                                <label htmlFor="city">City: </label>
                                <input id="city" type="text"></input>
                                <label htmlFor="state">State: </label>
                                <input id="state" style={{maxWidth: "50px"}} type="text"></input>
                                <label htmlFor="zip">Zip: </label>
                                <input id="zip" style={{maxWidth: "100px"}} type="text"></input>
                            </div>
                            <div className="form-line">
                                <label htmlFor="phone">Phone Number: </label>
                                <input id="phone" type="text"></input>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-block">
                        <div className="checkout-header">Payment Information</div>
                        <div className="form-section">
                            <div className="form-line">
                                <label htmlFor="name-card">Name on card: </label>
                                <input id="name-card" type="text"></input>
                            </div>
                            <div className="form-line">
                                <label htmlFor="card">Card Number: </label>
                                <input id="card" style={{maxWidth: "300px"}} type="text"></input>
                            </div>
                            <div className="form-line">
                                <label htmlFor="expiration">Expires: </label>
                                <input id="expiration" type="text"></input>
                                <label htmlFor="cvv">CVV: </label>
                                <input id="cvv" style={{maxWidth: "50px"}} type="text"></input>
                                <label htmlFor="zip-card">Zip: </label>
                                <input id="zip-card" style={{maxWidth: "100px"}} type="text"></input>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-block">
                        <div className="checkout-header">
                            <p>Cart Review</p>
                        </div>
                        <div id="cart-review-contents">
                            {cartItems.length===0 && <p style={{textAlign:'center'}}>Nothing in the cart!</p>}
                            {cartItems.map(item => {
                                return (
                                    <div key={item.id} className="cart-item-row">
                                        <div className="cart-item-image" style={{backgroundImage:`url(${item.thumbnail})`}}/>
                                        <div>{`${item.title}`}</div>
                                        <div>{`Qty: ${item.quantity}`}</div>
                                        <div>{`Subtotal: $${item.quantity*item.price}`}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div id="cart-review-total">
                            <div>Total:</div>
                            <div>{`$${cartTotal}`}</div>
                        </div>
                    </div>
                    <div id="submit-button-container">
                        <button type="submit">Pay Now</button>
                    </div>
                </form>
            </div>
        </>
    )
}