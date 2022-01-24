import { Link } from "react-router-dom";
import './NavigationBar.css'

export function NavigationBar(props: { logged: any; }) {

    return (
        <>
            <div className="navbar">
                <nav>
                    <ul>
                        <li><Link to="/">home</Link></li>
                        <li><Link to="/vault">vault</Link></li>
                        {props.logged
                            ? <li><Link to="/logout">logout</Link></li>
                            : <li><Link to="/login">login</Link></li>
                        }
                        <li><Link to="/register">register</Link></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}