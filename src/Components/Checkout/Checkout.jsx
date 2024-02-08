import Header from '../Header/Header.jsx'
import { useContext } from 'react'
import { StoreContext } from '../App.jsx'
import { useState } from 'react'
import './Checkout.css'

export default function Checkout() {
    if(!window.location.href.includes('checkout')) window.scrollTo(0, 0)

    const [showModal, setShowModal] = useState(false)
    const context = useContext(StoreContext)
    const cartItems = context.cartItems

    function toggleModal() {
        setShowModal(!showModal)
    }

    let cartTotal = 0
    cartItems.forEach(item => cartTotal+=(item.price * item.quantity))
    
    const submitPayment = (e) => {
        e.preventDefault();
        toggleModal();
    }

    return (
        <>
            <Header />
            {showModal && <>
                <div id="modal">
                    <div id="modal-message">
                        <p>Sike, this isn't a real payment form!</p>
                        <button onClick={() => toggleModal()}>OK</button>
                    </div>
                </div>
            </>}
            <div id="checkout-container">
                <form onSubmit={submitPayment}>
                    <div className="checkout-block">
                        <div className="checkout-header">Shipment Information</div>
                        <div className="form-section">
                            <div className="form-line">
                                <div className="input-pair">
                                    <label htmlFor="name">Full Name: </label>
                                    <input id="name" type="text"></input>
                                </div>
                                <div className="input-pair">
                                    <label htmlFor="country">Country: </label>
                                    <input id="country" type="text"></input>
                                </div>
                            </div>
                            <div className="form-line">
                                <div className="input-pair">
                                    <label htmlFor="address">Street Address: </label>
                                    <input id="address" style={{maxWidth: "300px"}} type="text"></input>
                                </div>
                            </div>
                            <div className="form-line">
                                <div className="input-pair">
                                    <label htmlFor="city">City: </label>
                                    <input id="city" type="text"></input>
                                </div>
                                <div className="input-pair">
                                    <label htmlFor="state">State: </label>
                                    <input id="state" style={{maxWidth: "50px"}} type="text"></input>
                                </div>
                                <div className="input-pair">
                                    <label htmlFor="zip">Zip: </label>
                                    <input id="zip" style={{maxWidth: "100px"}} type="text"></input>
                                </div>
                            </div>
                            <div className="form-line">
                                <div className="input-pair">
                                    <label htmlFor="phone">Phone Number: </label>
                                    <input id="phone" type="text"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-block">
                        <div className="checkout-header">Payment Information</div>
                        <div className="form-section">
                            <div className="form-line">
                                <div className="input-pair">
                                    <label htmlFor="name-card">Name on card: </label>
                                    <input id="name-card" type="text"></input>
                                </div>
                            </div>
                            <div className="form-line">
                                <div className="input-pair">
                                    <label htmlFor="card">Card Number: </label>
                                    <input id="card" style={{maxWidth: "300px"}} type="text"></input>
                                </div>
                            </div>
                            <div className="form-line">
                                <div className="input-pair">
                                    <label htmlFor="expiration">Expires: </label>
                                    <input id="expiration" type="text"></input>
                                </div>
                                <div className="input-pair">
                                    <label htmlFor="cvv">CVV: </label>
                                    <input id="cvv" style={{maxWidth: "50px"}} type="text"></input>
                                </div>
                                <div className="input-pair">
                                    <label htmlFor="zip-card">Zip: </label>
                                    <input id="zip-card" style={{maxWidth: "100px"}} type="text"></input>
                                </div>
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
                                        <div className="image-and-name">
                                            <div className="cart-item-image" style={{backgroundImage:`url(${item.thumbnail})`}}/>
                                            <div>{`${item.title}`}</div>
                                        </div>
                                        <div className="quantity-and-price">
                                            <div>{`Qty: ${item.quantity}`}</div>
                                            <div style={{marginLeft:`10px`}}>{`Subtotal: $${item.quantity*item.price}`}</div>
                                        </div>
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