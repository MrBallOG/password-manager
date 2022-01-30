import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePasswords } from "../actions/passwordsActions";
import { sentRefreshToken } from "../actions/refreshTokenActions";
import { unsetToken } from "../actions/tokenActions";
import { unsetVaultKey } from "../actions/vaultKeyActions";


export function Logout() {
    const navigate = useNavigate()
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

            dispatch(sentRefreshToken())
            dispatch(unsetToken())
            dispatch(unsetVaultKey())
            dispatch(deletePasswords())
        }

        const ac = new AbortController()
        handleLogout().then(_ => navigate("/"))
        return () => ac.abort()
    }, [dispatch, navigate])

    return (<></>)
}