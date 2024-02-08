import {useContext, useState} from 'react'
import {StoreContext} from '../App.jsx'
import Header from '../Header/Header.jsx'
// import LeftArrow from '../../assets/left-arrow.svg'
// import RightArrow from '../../assets/right-arrow.svg'
import Card from './Card.jsx'
import Sidebar from './Sidebar.jsx'
import './Store.css'

function Store() {
    if(!window.location.href.includes('store')) window.scrollTo(0, 0)
    // const[ShowSidebar, setShowSidebar] = useState(true)
    const context = useContext(StoreContext)
    const shopItems = context.shopItems

    let categories = []
    shopItems.forEach(item => {
        if(!categories.includes(item.category)) {
            categories.push(item.category)
        }
    })

    function capitalize(string) {
        return string.slice(0,1).toUpperCase()+string.slice(1)
    }

    return (
        <>
            <Header />
            <div id="store-container">
                {/* {!ShowSidebar && <img id="store-sidebar-open" src={RightArrow} onClick={() => setShowSidebar(true)}></img>}
                {ShowSidebar && <div id="store-sidebar">
                    <div id="store-sidebar-content">
                        <img id="store-sidebar-close" src={LeftArrow} onClick={() => setShowSidebar(false)}></img>
                        <h2>Categories</h2>
                        {categories.map(category => {
                            return (<h3 key={category}><a href={`#${category}`}>{`${capitalize(category)}`}</a></h3>)
                        })}
                    </div>
                </div>} */}
                <Sidebar categories={categories}/>
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
                                            <Card item={item} key={item.id}/>
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