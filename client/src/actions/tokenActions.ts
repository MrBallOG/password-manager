export const setToken = (token: string) => {
    return {
        type: "SET_TOKEN",
        payload: token
    }
}

export const unsetToken = () => {
    return {
        type: "UNSET_TOKEN"
    }
}

