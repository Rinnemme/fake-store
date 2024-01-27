// import { useState } from 'react'
import { createContext, useEffect, useState } from 'react'
// import { Router } from 'react-router'
import Router from './Router.jsx'

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
      await fetch('https://dummyjson.com/products', {mode: 'cors'})
      .then(result=>result.json())
      .then(json=> {
        console.log(json.products)
        setShopItems(json.products)
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
        <Router />
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