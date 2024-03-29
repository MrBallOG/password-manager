import { Dispatch } from "redux"
import { sentRefreshToken } from "../actions/refreshTokenActions"
import { setToken } from "../actions/tokenActions"
import { clearAll } from "./passwordsFetchHandlingUtils"


export const checkIfLoggedIn = async (token: string, refreshTokenSent: boolean, dispatch: Dispatch<any>, setReady: React.Dispatch<React.SetStateAction<boolean>>) => {
    const tokenExists = token !== ""
    const tokenExpired = checkIfTokenExpired(token)

    if ((tokenExists && tokenExpired) || !refreshTokenSent) {
        const accessToken = await checkIfRefreshAvailable()

        if (!refreshTokenSent) {
            dispatch(sentRefreshToken())
        }

        if (accessToken !== "") {
            dispatch(setToken(accessToken))
        } else {
            clearAll(dispatch)
        }
    }
    setReady(true)
}


export const decodeTokenPayload = (token: string) => {
    const payload = token.split(".")[1]

    return JSON.parse(window.atob(payload))
}


const checkIfTokenExpired = (token: string) => {
    if (!token || token === "")
        return true

    const decodedToken = decodeTokenPayload(token)

    if (decodedToken.exp < new Date().getTime() / 1000)
        return true

    return false
}


export const checkIfRefreshAvailable = async () => {
    const init = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include'
    }
    const url = process.env.REACT_APP_API_LINK + "auth/refresh"
    const res = await fetch(url, init as RequestInit)
    if (res.status === 401) {
        return ""
    }
    const dict = await res.json()

    return dict.token
}

