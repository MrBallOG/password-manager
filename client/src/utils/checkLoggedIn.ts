import { Dispatch } from "react"
import { setToken } from "../actions/tokenActions"


export const checkIfLoggedIn = async (token: string, dispatch: Dispatch<any>, setReady: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (token !== "" && !checkIfTokenExpired(token)) {
        setReady(true)
        return
    }

    const setAccessToken = async () => {
        const accessToken = await checkIfRefreshAvailable()
        if (accessToken !== "") {
            dispatch(setToken(accessToken))
        }
    }
    setAccessToken().then(_ => setReady(true))
}


const checkIfTokenExpired = (token: string) => {
    const payload = token.split(".")[1]

    const decodedToken = JSON.parse(window.atob(payload))

    if (decodedToken.exp < new Date().getTime() / 1000)
        return true

    return false
}


const checkIfRefreshAvailable = async () => {
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

