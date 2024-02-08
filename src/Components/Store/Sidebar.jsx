import { useState } from "react"
import LeftArrow from '../../assets/left-arrow.svg'
import RightArrow from '../../assets/right-arrow.svg'

export default function Sidebar({categories}) {
    const[showSidebar, setShowSidebar] = useState(true)

    function capitalize(string) {
        return string.slice(0,1).toUpperCase()+string.slice(1)
    }

    return (
        <>
            {!showSidebar && <img id="store-sidebar-open" src={RightArrow} onClick={() => setShowSidebar(true)}></img>}
            {showSidebar && <div id="store-sidebar">
                <div id="store-sidebar-content">
                    <img id="store-sidebar-close" src={LeftArrow} onClick={() => setShowSidebar(false)}></img>
                    <h2>Categories</h2>
                    {categories.map(category => {
                        return (<h3 key={category}><a href={`#${category}`}>{`${capitalize(category)}`}</a></h3>)
                    })}
                </div>
            </div>}
        </>
    )
}