import { useState } from "react";
import { NavigationBar } from "../utils/NavigationBar";
import '../utils/style.css'

export function Register(props: { logged: any, setLogged: any; }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [masster_password, setMassterPassword] = useState('');

    const handleRegister = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const route = process.env.REACT_APP_API_LINK + "/register"
        const data = { username, email, password, masster_password }
    }

    return (
        <>
            <NavigationBar logged={props.logged} />

            <div className="form">
                <form onSubmit={handleRegister}>
                    <label>Username <br />
                        <input type="text" value={username} />
                    </label>
                    <label>Email <br />
                        <input type="text" />
                    </label>
                    <label>Password <br />
                        <input type="text" />
                    </label>
                    <label>Master Password <br />
                        <input type="text" />
                    </label>
                    <button>Register</button>
                </form>
            </div>

        </>
    )
}