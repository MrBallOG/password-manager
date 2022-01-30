export const getAllPasswordsFetch = async (token: any, authKey: string) => {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            master_password: { master_password: authKey }
        }),
        mode: 'cors'
    }
    const url = process.env.REACT_APP_API_LINK + "password/all"
    return await fetch(url, init as RequestInit)
}


export const addPasswordFetch = async (token: any, authKey: string, ciphertext: string) => {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: { ciphertext: ciphertext },
            token: token,
            master_password: { master_password: authKey }
        }),
        mode: 'cors'
    }
    const url = process.env.REACT_APP_API_LINK + "password"
    return await fetch(url, init as RequestInit)
}


export const updatePasswordFetch = async (token: any, authKey: string, ciphertext: string, id: number) => {
    const init = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: { ciphertext: ciphertext, id: id },
            token: token,
            master_password: { master_password: authKey }
        }),
        mode: 'cors'
    }
    const url = process.env.REACT_APP_API_LINK + "password"
    return await fetch(url, init as RequestInit)
}


export const deletePasswordFetch = async (token: any, authKey: string, id: number) => {
    const init = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            master_password: { master_password: authKey }
        }),
        mode: 'cors'
    }
    const url = process.env.REACT_APP_API_LINK + "password/" + id
    return await fetch(url, init as RequestInit)
}


export const masterPasswordFetch = async (token: any, authKey: string) => {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            master_password: { master_password: authKey }
        }),
        mode: 'cors'
    }
    const url = process.env.REACT_APP_API_LINK + "auth/master"
    return await fetch(url, init as RequestInit)
}