export const checkLoggedIn = async () => {
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
