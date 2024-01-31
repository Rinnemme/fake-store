// rendered list of items with headings by category from the return array

import {useContext, useState} from 'react'
import {StoreContext} from '../App.jsx'
import Header from '../Header/Header.jsx'
import './Store.css'

function Store() {
    window.scrollTo(0, 0)
    const context = useContext(StoreContext)
    const shopItems = context.shopItems
    const cartItems = context.cartItems
    const updateCart = context.updateCart
    let categories = []
    shopItems.forEach(item => {
        if(!categories.includes(item.category)) {
            categories.push(item.category)
        }
    })

    function capitalize(string) {
        return string.slice(0,1).toUpperCase()+string.slice(1)
    }

    function addToCart(item) {
        item.quantity = document.getElementById(`${item.title}-input`).value
        if (!cartItems.find(match=>match.title===item.title)) {
            updateCart([...cartItems, {...item}])
        }
        else {
            const newCart = []
            cartItems.forEach(item => newCart.push({...item}))
            const itemInCart = newCart.find(match=>match.title===item.title)
            itemInCart.quantity = +itemInCart.quantity + +item.quantity
            updateCart(newCart)
        }
    }

    return (
        <>
            <Header />
            <div id="store-container">
                <div id="store-sidebar">
                    <div id="store-sidebar-content">
                        <h2>Categories</h2>
                        {categories.map(category => {
                            return (<h3 key={category}><a href={`#${category}`}>{`${capitalize(category)}`}</a></h3>)
                        })}
                    </div>
                </div>
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
                                                        <button onClick={() => addToCart(item)}>Add to Cart</button>
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