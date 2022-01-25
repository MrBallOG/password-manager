import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../reducers";
import './NavigationBar.css'

export function NavigationBar() {
    const token = useSelector((state: RootState) => state.token)
    return (
        <>
            <div className="navbar">
                <nav>
                    <ul>
                        <li><Link to="/">home</Link></li>
                        <li><Link to="/vault">vault</Link></li>
                        {token.token !== ""
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