export const fetchAllPasswords = async (token: any, masterPassword: string) => {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            master_password: { master_password: masterPassword }
        }),
        mode: 'cors'
    }
    const url = process.env.REACT_APP_API_LINK + "password/all"
    return await fetch(url, init as RequestInit)
} 