import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAll } from "../utils/passwordsFetchHandlingUtils";


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
            clearAll(dispatch)
        }

        const ac = new AbortController()
        handleLogout().then(_ => navigate("/"))
        return () => ac.abort()
    }, [dispatch, navigate])

    return (<></>)
}