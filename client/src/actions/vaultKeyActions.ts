export const setVaultKey = (vaultKey: string) => {
    return {
        type: "SET_VAULT_KEY",
        payload: vaultKey
    }
}

export const unsetVaultKey = () => {
    return {
        type: "UNSET_VAULT_KEY"
    }
}
