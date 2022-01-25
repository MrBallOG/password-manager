import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { NavigationBar } from "../utils/NavigationBar";
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { checkIfLoggedIn } from "../utils/checkLoggedIn";


export function Vault() {
    const [ready, setReady] = useState(false)
    const token = useSelector((state: RootState) => state.token)
    const dispatch = useDispatch()

    useEffect(() => {
        const checkLoggedIn = async () => {
            await checkIfLoggedIn(token.token, dispatch, setReady)
        }
        checkLoggedIn()
    }, [dispatch, token.token])

    if (!ready) {
        return (<></>)
    }

    if (token.token === "")
        return <Navigate to='/login' />

    return (
        <>
            <NavigationBar />

        </>
    )
}