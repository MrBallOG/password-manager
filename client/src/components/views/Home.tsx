import { NavigationBar } from "../utils/NavigationBar";


export function Home(props: { logged: any, setLogged: any; }) {

    return (
        <>
            <NavigationBar logged={props.logged} />
            <h1>Password Manager</h1>
        </>
    )
}