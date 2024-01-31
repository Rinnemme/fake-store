import '../index.css'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <>
            <div id="modal">
                <div id="modal-message">
                    <p>Whoops, looks like there's nothing here!</p>
                    <Link to='/'><button>Go Home</button></Link>
                </div>
            </div>
        </>
    )
}