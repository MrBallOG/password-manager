import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../reducers";
import { unsetToken } from "../actions/tokenActions";


export function Logout() {
    const [ready, setReady] = useState(false)
    const token = useSelector((state: RootState) => state.token)
    const dispatch = useDispatch()

    useEffect(() => {
        const handleLogout = async () => {
            const init = {
                method: 'POST',
                mode: 'cors',
                credentials: 'include'
            }
            const url = process.env.REACT_APP_API_LINK + "auth/logout"
            await fetch(url, init as RequestInit)

            if (token.token !== "") {
                dispatch(unsetToken())
            }
        }

        const ac = new AbortController();
        handleLogout().then(_ => setReady(true))
        return () => ac.abort();
    }, [dispatch, token.token])


    if (!ready)
        return (<></>)

    return <Navigate to='/' />
}