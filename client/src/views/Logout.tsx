import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { deletePasswords } from "../actions/passwordsActions";
import { unsetToken } from "../actions/tokenActions";
import { unsetVaultKey } from "../actions/vaultKeyActions";


export function Logout() {
    const [ready, setReady] = useState(false)
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

            dispatch(unsetToken())
            dispatch(unsetVaultKey())
            dispatch(deletePasswords())
        }

        const ac = new AbortController();
        handleLogout().then(_ => setReady(true))
        return () => ac.abort();
    }, [dispatch])


    if (!ready)
        return (<></>)

    return <Navigate to='/' />
}