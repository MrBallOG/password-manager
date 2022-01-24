import { NavigationBar } from "../utils/NavigationBar";

export function Vault(props: { logged: any, setLogged: any; }) {

    return (
        <>
            <NavigationBar logged={props.logged} />
        </>
    )
}