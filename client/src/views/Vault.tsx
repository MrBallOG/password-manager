import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { NavigationBar } from "../utils/NavigationBar";
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { checkIfLoggedIn } from "../utils/LoginUtils";
import { IPasswordProps, Password } from "./Password";
import { IMasterLoginProps, MasterLogin } from "./MasterLogin";
import { handleGetAllPasswords } from "../utils/passwordsFetchHandlingUtils";


export function Vault() {
    const [ready, setReady] = useState(false)
    const [addState, setAddState] = useState(false)
    const token = useSelector((state: RootState) => state.token)
    const refreshTokenSent = useSelector((state: RootState) => state.refreshToken)
    const vaultKey = useSelector((state: RootState) => state.vaultKey)
    const passwords = useSelector((state: RootState) => state.passwords)
    const dispatch = useDispatch()

    useEffect(() => {
        const checkLoggedIn = async () => {
            await checkIfLoggedIn(token.token, refreshTokenSent, dispatch, setReady)
            if (vaultKey !== "") {
                await handleGetAllPasswords(token, vaultKey, dispatch)
            }
        }
        const ac = new AbortController()
        checkLoggedIn()
        return () => ac.abort()
    }, [dispatch, token.token, refreshTokenSent, token, vaultKey])

    if (!ready) {
        return (<></>)
    }

    if (token.token === "")
        return <Navigate to="/login" />

    if (vaultKey === "") {
        const props: IMasterLoginProps = {
            dispatch: dispatch,
            token: token
        }
        return <MasterLogin {...props} />
    }

    if (addState) {
        return <Navigate to="/vault/add" />
    }

    return (
        <>
            <NavigationBar />
            <h1>Passwords</h1>
            <button className="simple" onClick={() => setAddState(true)}>Add Password</button>
            {passwords.map((password) => {
                let props: IPasswordProps = {
                    dispatch: dispatch,
                    token: token,
                    vaultKey: vaultKey,
                    password: password,
                    postOnSave: false
                }

                return <Password key={password.id as number} {...props} />
            })}
        </>
    )
}