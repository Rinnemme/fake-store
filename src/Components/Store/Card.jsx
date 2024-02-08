import {useContext, useState, useRef} from 'react'
import {StoreContext} from '../App.jsx'

export default function Card({item}) {
    const context = useContext(StoreContext)
    const cartItems = context.cartItems
    const updateCart = context.updateCart
    const [showModal, setShowModal] = useState(false)
    const buttonRef = useRef(null)
    const inputRef = useRef(1)

    function toggleModal() {
        setShowModal(!showModal)
    }

    function showAddedToCart() {
        const buttonWidth = buttonRef.current.offsetWidth
        const buttonHeight = buttonRef.current.offsetHeight
        buttonRef.current.disabled=true
        buttonRef.current.style.backgroundColor='#ffdca4'
        buttonRef.current.style.color='#53370b'
        buttonRef.current.style.width = `${buttonWidth}px`
        buttonRef.current.style.height = `${buttonHeight}px`
        buttonRef.current.textContent='Added!'
        setTimeout(function(){
           buttonRef.current.style.backgroundColor='#86e8dc'
           buttonRef.current.style.color='#0f4f47'
           buttonRef.current.disabled=false
           buttonRef.current.style.width = 'auto'
           buttonRef.current.style.height = 'auto'
           buttonRef.current.textContent='Add to Cart'
           buttonRef.current.style.transition='0.8s all'
        }, 700)
    }

    function addToCart() {
        item.quantity = inputRef.current
        if (!cartItems.find(match=>match.title===item.title)) {
            updateCart([...cartItems, {...item}])
            showAddedToCart(item)
        }
        else {
            const newCart = []
            cartItems.forEach(item => newCart.push({...item}))
            const itemInCart = newCart.find(match=>match.title===item.title)
            if (+itemInCart.quantity + +item.quantity > 5) {
                toggleModal()
            } else {
                itemInCart.quantity = +itemInCart.quantity + +item.quantity
                updateCart(newCart)
                showAddedToCart(item)
            }
        }
    }

    return (
        <>
            {showModal && <>
                <div id="modal">
                    <div id="modal-message">
                        <p>Uh oh, you can't add more than 5 of the same item to your cart! It's 
                            just a matter of our limited stock.</p>
                        <button onClick={() => toggleModal()}>OK</button>
                    </div>
                </div>
            </>}
            <div key={item.id} className="store-item-card">
                <div className="store-item-image" style={{backgroundImage:`url(${item.thumbnail})`}}/>
                <div className="store-item-info">
                    <h4>{`${item.title}`}</h4>
                    <p>{`${item.description}`}</p>
                    <div className="add-to-cart-section">
                        <div>Quantity:</div>
                        <input id={`${item.title}-input`} type="number" max="5" min="1" defaultValue={inputRef.current} onChange={(e) => {inputRef.current = e.target.value}}></input>
                        <button id={`${item.id}-add`} ref={buttonRef} onClick={() => addToCart(item)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}
