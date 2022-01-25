import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { NavigationBar } from "../utils/NavigationBar";
import { Navigate } from 'react-router-dom'

export function Vault() {
    const token = useSelector((state: RootState) => state.token)

    function auth() {
        if (token.token === "")
            return false
        return true
    }

    if (!auth())
        return <Navigate to='/login' />

    return (
        <>
            <NavigationBar />
        </>
    )

}