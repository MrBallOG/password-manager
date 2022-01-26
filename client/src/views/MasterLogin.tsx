import { useForm } from "react-hook-form"
import { Dispatch } from "redux"
import { addPassword } from "../actions/passwordsActions"
import { setToken, unsetToken } from "../actions/tokenActions"
import { setVaultKey } from "../actions/vaultKeyActions"
import { checkIfRefreshAvailable } from "../utils/LoginUtils"
import { deriveAuthKey, deriveVaultKey } from "../utils/masterPasswordUtils"
import { NavigationBar } from "../utils/NavigationBar"
import { decryptPassword } from "../utils/passwordsEncryptionUtils"
import { fetchAllPasswords } from "../utils/passwordsFetchUtils"

export interface IMasterLoginProps {
    dispatch: Dispatch<any>
    token: any
}

export function MasterLogin(props: IMasterLoginProps) {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()

    const handleMasterLogin = async (data: any) => {
        const vaultKey = deriveVaultKey(props.token.token, data.masterPassword)
        const authKey = deriveAuthKey(props.token.token, vaultKey)
        let res = await fetchAllPasswords(props.token, authKey)

        if (res.status === 401) {
            const dict = await res.json()
            if (dict.detail === "invalid token") {
                props.dispatch(unsetToken())
                return
            }
            const newToken = await checkIfRefreshAvailable()
            if (newToken === "") {
                props.dispatch(unsetToken())
                return
            }
            props.dispatch(setToken(newToken))
            res = await fetchAllPasswords(props.token, authKey)
        }

        if (res.status === 404) {
            setError("masterPassword", { message: "incorrect password" })
            return
        }
        const dict: [any] = await res.json()

        dict.forEach(cipherObject => {
            const id = cipherObject.id
            const ciphertext = cipherObject.ciphertext
            const password = decryptPassword(id, ciphertext, props.token.token, vaultKey)
            props.dispatch(addPassword(password))
        })

        props.dispatch(setVaultKey(vaultKey))
    }


    return (
        <>
            <NavigationBar />
            <div className="form">
                <h2>Login to vault</h2>
                <>
                    {errors.masterPassword ? <div> {errors.masterPassword.message} <br /></div> : ""}
                    <label> Master Password <br />
                        <input type="password" {...register('masterPassword', {
                            required: true,
                            pattern: {
                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/,
                                message: "password must contain A-Z, a-z, 0-9, and special characters"
                            },
                            minLength: { value: 8, message: "password must be at least 8 characters" },
                            maxLength: { value: 50, message: "password must be max 50 characters" }
                        })} />
                    </label>
                    <button onClick={handleSubmit(handleMasterLogin)}>Send</button>
                </>
            </div>
        </>
    )
}