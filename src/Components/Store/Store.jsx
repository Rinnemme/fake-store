// rendered list of items with headings by category from the return array

import {useContext, useState} from 'react'
import {StoreContext} from '../App.jsx'

function Store() {
    const context = useContext(StoreContext)
    const shopItems = context.shopItems
    const cartItems = context.cartItems
    const updateCart = context.updateCart

    const [Count, setCount] = useState(0)

    return (
        <>
            {cartItems.map(item => {
                return <div key={item.id}>{`${item.title}`}</div>
            })}
            <div>lol</div>
            <button onClick={() => {
                    cartItems.push(shopItems[Count])
                    setCount(Count+1)
                    updateCart([...cartItems])
                }}>UpdateCart</button>
        </>
    )
}

export default Store