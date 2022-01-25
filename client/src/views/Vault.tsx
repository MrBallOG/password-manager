import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { NavigationBar } from "../utils/NavigationBar";
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { checkIfLoggedIn } from "../utils/LoginUtils";
import { Password } from "./Password";
import { IPassword } from "../reducers/passwords";


export function Vault() {
    const [ready, setReady] = useState(false)
    const token = useSelector((state: RootState) => state.token)
    const refreshTokenSent = useSelector((state: RootState) => state.refreshToken)
    const masterPassword = useSelector((state: RootState) => state.masterPassword)
    const dispatch = useDispatch()

    useEffect(() => {
        const checkLoggedIn = async () => {
            await checkIfLoggedIn(token.token, refreshTokenSent, dispatch, setReady)
        }
        const ac = new AbortController();
        checkLoggedIn()
        return () => ac.abort();
    }, [dispatch, token.token, refreshTokenSent])

    const addPassword = () => {
        passwords.push({ password: "", id: undefined, email: "", service: "", username: "" })
    }

    if (!ready) {
        return (<></>)
    }

    if (token.token === "")
        return <Navigate to='/login' />


    const passwords: IPassword[] = []
    passwords.push({ password: "a", id: 1, email: "aa", service: "aa", username: "aaaa" })
    passwords.push({ password: "b", id: 1, email: "bb", service: "bb", username: "bbbb" })
    const passwordList = passwords.map((p, i) => <Password key={i} {...p} />)
    console.log(passwords)
    return (
        <>
            <NavigationBar />
            <h2>Passwords</h2>
            <button onClick={addPassword}>Add Password</button>
            {passwordList}
        </>
    )
}