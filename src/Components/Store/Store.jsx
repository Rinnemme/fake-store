import {useContext, useState} from 'react'
import {StoreContext} from '../App.jsx'
import Header from '../Header/Header.jsx'
import LeftArrow from '../../assets/left-arrow.svg'
import RightArrow from '../../assets/right-arrow.svg'
import './Store.css'

function Store() {
    if(!window.location.href.includes('store')) window.scrollTo(0, 0)
    const[ShowModal, setShowModal] = useState(false)
    const[ShowSidebar, setShowSidebar] = useState(true)
    const context = useContext(StoreContext)
    const shopItems = context.shopItems
    const cartItems = context.cartItems
    const updateCart = context.updateCart

    function toggleModal() {
        const newState = ShowModal === true ? false : true
        setShowModal(newState)
    }

    let categories = []
    shopItems.forEach(item => {
        if(!categories.includes(item.category)) {
            categories.push(item.category)
        }
    })

    function capitalize(string) {
        return string.slice(0,1).toUpperCase()+string.slice(1)
    }

    function showAddedToCart(item) {
        const buttonWidth = document.getElementById(`${item.id}-add`).offsetWidth
        document.getElementById(`cart-counter`).style.backgroundColor='#86e8dc'
        document.getElementById(`cart-counter`).style.color='#0f4f47'
        document.getElementById(`${item.id}-add`).disabled=true
        document.getElementById(`${item.id}-add`).style.backgroundColor='#ffdca4'
        document.getElementById(`${item.id}-add`).style.color='#53370b'
        document.getElementById(`${item.id}-add`).style.width = `${buttonWidth}px`
        document.getElementById(`${item.id}-add`).textContent='Added!'
        setTimeout(function(){
            document.getElementById(`cart-counter`).style.backgroundColor='#ffdca4'
            document.getElementById(`cart-counter`).style.transition='0.5s all'
        }, 400)
        setTimeout(function(){
            document.getElementById(`cart-counter`).style.backgroundColor='#ffdca4'
            document.getElementById(`cart-counter`).style.color='#53370b'
            document.getElementById(`cart-counter`).style.transition='0.5s all'
            document.getElementById(`${item.id}-add`).style.backgroundColor='#86e8dc'
            document.getElementById(`${item.id}-add`).style.color='#0f4f47'
            document.getElementById(`${item.id}-add`).disabled=false
            document.getElementById(`${item.id}-add`).style.width = `auto`
            document.getElementById(`${item.id}-add`).textContent='Add to Cart'
            document.getElementById(`${item.id}-add`).style.transition='0.5s all'
        }, 1000)
    }

    function addToCart(item) {
        item.quantity = document.getElementById(`${item.title}-input`).value
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
            <Header />
            {ShowModal && <>
                <div id="modal">
                    <div id="modal-message">
                        <p>Uh oh, you can't add more than 5 of the same item to your cart! It's 
                            just a matter of our limited stock.</p>
                        <button onClick={() => toggleModal()}>OK</button>
                    </div>
                </div>
            </>}
            <div id="store-container">
                {!ShowSidebar && <img id="store-sidebar-open" src={RightArrow} onClick={() => setShowSidebar(true)}></img>}
                {ShowSidebar && <div id="store-sidebar">
                    <div id="store-sidebar-content">
                        <img id="store-sidebar-close" src={LeftArrow} onClick={() => setShowSidebar(false)}></img>
                        <h2>Categories</h2>
                        {categories.map(category => {
                            return (<h3 key={category}><a href={`#${category}`}>{`${capitalize(category)}`}</a></h3>)
                        })}
                    </div>
                </div>}
                <div id="store-main">
                    {categories.map(category => {
                        const categoryItems = []
                        shopItems.forEach(item=>{if(item.category===category) categoryItems.push({...item})})
                        return (
                            <div className="store-section-container" key={`${category}`}>
                                <div className="store-section-header" id={category}>{`${capitalize(category)}`}</div>
                                <div className="store-section">
                                    {categoryItems.map(item => {
                                        return (
                                            <div key={item.id} className="store-item-card">
                                                <div className="store-item-image" style={{backgroundImage:`url(${item.thumbnail})`}}/>
                                                <div className="store-item-info">
                                                    <h4>{`${item.title}`}</h4>
                                                    <p>{`${item.description}`}</p>
                                                    <div className="add-to-cart-section">
                                                        <div>Quantity:</div>
                                                        <input id={`${item.title}-input`} type="number" max="5" min="1" defaultValue="1"></input>
                                                        <button id={`${item.id}-add`} onClick={() => addToCart(item)}>Add to Cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Store