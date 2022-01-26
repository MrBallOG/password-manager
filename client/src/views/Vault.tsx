import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { NavigationBar } from "../utils/NavigationBar";
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { checkIfLoggedIn } from "../utils/LoginUtils";
import { IPasswordProps, Password } from "./Password";
import { IMasterLoginProps, MasterLogin } from "./MasterLogin";


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
        }
        const ac = new AbortController();
        checkLoggedIn()
        return () => ac.abort();
    }, [dispatch, token.token, refreshTokenSent])

    if (!ready) {
        return (<></>)
    }

    if (token.token === "")
        return <Navigate to='/login' />

    if (vaultKey === "") {
        const props: IMasterLoginProps = {
            dispatch: dispatch,
            token: token
        }
        return <MasterLogin {...props} />
    }

    if (addState) {
        const props: IPasswordProps = {
            dispatch: dispatch,
            token: token,
            vaultKey: vaultKey,
            password: { id: undefined, password: "", email: "", service: "", username: "" },
            addState: addState,
            setAddState: setAddState
        }
        return (
            <>
                <NavigationBar />
                <div style={{ marginTop: 200 }}>
                    <h2>Add Password</h2>
                    <Password {...props} />
                </div>
            </>
        )
    }


    return (
        <>
            <NavigationBar />
            <h1>Passwords</h1>
            <button className="simple" onClick={() => setAddState(true)}>Add Password</button>
            {passwords.map((password, index) => {
                const props: IPasswordProps = {
                    dispatch: dispatch,
                    token: token,
                    vaultKey: vaultKey,
                    password: password,
                    addState: addState,
                    setAddState: setAddState
                }

                return <Password key={index} {...props} />
            })}
        </>
    )
}