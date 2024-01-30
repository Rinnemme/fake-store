// rendered list of items with headings by category from the return array

import {useContext, useState} from 'react'
import {StoreContext} from '../App.jsx'
import Header from '../Header/Header.jsx'
import './Store.css'

function Store() {
    const context = useContext(StoreContext)
    const shopItems = context.shopItems
    // const cartItems = context.cartItems
    // const updateCart = context.updateCart
    // const [Count, setCount] = useState(0)
    let categories = []
    shopItems.forEach(item => {
        if(!categories.includes(item.category)) {
            categories.push(item.category)
        }
    })

    return (
        <>
            <Header />
            {/* {cartItems.map(item => {
                return <div key={item.id}>{`${item.title}`}</div>
            })}
            <button onClick={() => {
                    cartItems.push({...shopItems[Count], quantity:1})
                    setCount(Count+1)
                    updateCart([...cartItems])
                }}>Add thing to cart</button> */}
            <div id="store-container">
                <div id="store-sidebar"></div>
                <div id="store-main">
                    {categories.map(category => {
                        const categoryItems = shopItems.filter(item=>item.category===category)
                        return (
                            <div className="store-section-container" key={`${category}`}>
                                <div className="store-section-header">{`${category.toUpperCase()}`}</div>
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
                                                        <input type="number" max="5" defaultValue="1"></input>
                                                        <button>Add to Cart</button>
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