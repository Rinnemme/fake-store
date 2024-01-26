// import { useState } from 'react'
import { createContext, useEffect, useState } from 'react'
// import { Router } from 'react-router'
import Store from './Store/Store.jsx'

const StoreContext = createContext({
  cartItems: [],
  shopItems: [],
  updateCart: () => {},
})

function App() {
  const [CartItems, setCartItems] = useState([])
  const [ShopItems, setShopItems] = useState([])

  async function fetchItems() {
    try {
      await fetch('https://api.escuelajs.co/api/v1/products')
      .then(result=>result.json())
      .then(json=> {
        // console.log(json)
        setShopItems(json)
      })
    }
    catch (err) {console.log(err)}
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <>
      <StoreContext.Provider value = {{
        cartItems: CartItems,
        shopItems: ShopItems,
        updateCart: setCartItems,
      }}>
        <div>Placeholder</div>
        <Store />
      </StoreContext.Provider>
    </>
  )
}

export default App
export {StoreContext}

// Do the fetch
// Create & Provide the context
// Render the header (with passed context)
// Render the Router