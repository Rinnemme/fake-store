import { createContext, useEffect, useState } from 'react'
import Router from './Router.jsx'
import { defaultCart } from './DefaultCart.jsx'
import '../index.css'

const StoreContext = createContext({
  cartItems: [],
  shopItems: [],
  updateCart: () => {},
  removeFromCart: () => {},
})

const loadedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : defaultCart

function App() {
  const [cartItems, setCartItems] = useState(loadedCart)
  const [shopItems, setShopItems] = useState([])
  const [fetchFailed, setFetchFailed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
 
  function updateCart(cart) {
    setCartItems(cart)
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  function removeFromCart(item) {
    const newCart = []
    cartItems.forEach(item => newCart.push({...item}))
    const itemIndex = newCart.indexOf(newCart.find(match=>match.title===item.title))
    newCart.splice(itemIndex,1)
    updateCart(newCart)
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
      {fetchFailed &&  <>
            <div id="modal">
                <div id="modal-message">
                    <p>{`Looks like we failed to get the data necessary here!`}</p>
                    <p>{`(${errorMessage})`}</p>
                    <button onClick={() => location.reload()}>Refresh</button>
                </div>
            </div>
      </>}
      {!fetchFailed && loading && <>
            <div id="modal">
                <div id="modal-message">
                    <p>{`Loading...`}</p>
                </div>
            </div>
      </>}
      {!fetchFailed && !loading &&
      <StoreContext.Provider value = {{
        cartItems: cartItems,
        shopItems: shopItems,
        updateCart: updateCart,
        removeFromCart: removeFromCart,
      }}>
        <Router />
      </StoreContext.Provider>}
    </>
  )
}

export default App
export {StoreContext}