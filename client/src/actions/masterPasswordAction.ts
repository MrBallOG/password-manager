export const setMasterPassword = (masterPassword: string) => {
    return {
        type: "SET_MASTER_PASSWORD",
        payload: masterPassword
    }
}

export const unsetMasterPassword = () => {
    return {
        type: "UNSET_MASTER_PASSWORD"
    }
}
