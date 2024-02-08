import {useContext, useState} from 'react'
import {StoreContext} from '../App.jsx'
import Header from '../Header/Header.jsx'
import Card from './Card.jsx'
import Sidebar from './Sidebar.jsx'
import './Store.css'
import './Card.css'
import './Sidebar.css'

function Store() {
    if(!window.location.href.includes('store')) window.scrollTo(0, 0)
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
                <Sidebar categories={categories} capitalize={capitalize}/>
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