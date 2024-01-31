import { createContext, useEffect, useState } from 'react'
import Router from './Router.jsx'
import { defaultCart } from './DefaultCart.jsx'
import '../index.css'

const StoreContext = createContext({
  cartItems: [],
  shopItems: [],
  updateCart: () => {},
})

const loadedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : defaultCart

function App() {
  const [CartItems, setCartItems] = useState(loadedCart)
  const [ShopItems, setShopItems] = useState([])
  const [FetchFailed, setFetchFailed] = useState(false)
  const [ErrorMessage, setErrorMessage] = useState('')
  const [Loading, setLoading] = useState(true)
 
  function updateCart(cart) {
    setCartItems(cart)
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  async function fetchItems() {
    try {
      await fetch('https://dummyjson.com/products', {mode: 'cors'})
      .then(result=>result.json())
      .then(json=>setShopItems(json.products))
      .finally(setLoading(false))
    }
    catch (err) {
      setErrorMessage(`${err}`)
      setFetchFailed(true)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <>
      {FetchFailed &&  <>
            <div id="modal">
                <div id="modal-message">
                    <p>{`Looks like we failed to get the data necessary here!`}</p>
                    <p>{`(${ErrorMessage})`}</p>
                    <button onClick={() => location.reload()}>Refresh</button>
                </div>
            </div>
      </>}
      {!FetchFailed && Loading && <>
            <div id="modal">
                <div id="modal-message">
                    <p>{`Loading...`}</p>
                </div>
            </div>
      </>}
      {!FetchFailed && !Loading &&
      <StoreContext.Provider value = {{
        cartItems: CartItems,
        shopItems: ShopItems,
        updateCart: updateCart,
      }}>
        <Router />
      </StoreContext.Provider>}
    </>
  )
}

export default App
export {StoreContext}

// Do the fetch
// Create & Provide the context
// Render the header (with passed context)
// Render the Router