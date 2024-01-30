import { createContext, useEffect, useState } from 'react'
import Router from './Router.jsx'

const StoreContext = createContext({
  cartItems: [],
  shopItems: [],
  updateCart: () => {},
})

const loadedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

function App() {
  const [CartItems, setCartItems] = useState(loadedCart)
  const [ShopItems, setShopItems] = useState([])

  function updateCart(cart) {
    setCartItems(cart)
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  async function fetchItems() {
    try {
      await fetch('https://dummyjson.com/products', {mode: 'cors'})
      .then(result=>result.json())
      .then(json=>setShopItems(json.products))
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
        updateCart: updateCart,
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