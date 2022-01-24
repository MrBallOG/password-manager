import { NavigationBar } from "../utils/NavigationBar";

export function Login(props: { logged: any, setLogged: any; }) {

    return (
        <>
            <NavigationBar logged={props.logged} />

            <div className="form">
                <form>
                    <label>Username <br />
                        <input type="text" />
                    </label>
                    <label>Email <br />
                        <input type="text" />
                    </label>
                    <label>Password <br />
                        <input type="text" />
                    </label>
                    <button>Login</button>
                </form>
            </div>
        </>
    )
}