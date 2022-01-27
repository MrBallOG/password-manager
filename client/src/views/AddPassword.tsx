import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { NavigationBar } from "../utils/NavigationBar";
import { checkIfLoggedIn } from "../utils/LoginUtils";
import { IPasswordProps, Password } from "./Password";
import { Navigate } from "react-router-dom";

export function AddPassword() {
    const [ready, setReady] = useState(false)
    const token = useSelector((state: RootState) => state.token)
    const refreshTokenSent = useSelector((state: RootState) => state.refreshToken)
    const vaultKey = useSelector((state: RootState) => state.vaultKey)
    const dispatch = useDispatch()
    const props: IPasswordProps = {
        dispatch: dispatch,
        token: token,
        vaultKey: vaultKey,
        password: { id: undefined, password: "", email: "", service: "", username: "" },
        postOnSave: true
    }

    useEffect(() => {
        const checkLoggedIn = async () => {
            await checkIfLoggedIn(token.token, refreshTokenSent, dispatch, setReady)
        }
        const ac = new AbortController()
        checkLoggedIn()
        return () => ac.abort()
    }, [dispatch, token.token, refreshTokenSent])

    if (!ready)
        return (<></>)

    if (token.token === "")
        return <Navigate to="/login" />

    if (vaultKey === "") {
        return <Navigate to="/vault" />
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