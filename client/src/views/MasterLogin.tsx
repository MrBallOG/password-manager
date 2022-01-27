import { useForm } from "react-hook-form"
import { Dispatch } from "redux"
import { setVaultKey } from "../actions/vaultKeyActions"
import { deriveAuthKey, deriveVaultKey } from "../utils/masterPasswordUtils"
import { NavigationBar } from "../utils/NavigationBar"

export interface IMasterLoginProps {
    dispatch: Dispatch<any>
    token: any
}

export function MasterLogin(props: IMasterLoginProps) {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()

    const handleMasterLogin = async (data: any) => {
        const vaultKey = deriveVaultKey(props.token.token, data.masterPassword)
        const authKey = deriveAuthKey(props.token.token, vaultKey)
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: props.token,
                master_password: { master_password: authKey }
            }),
            mode: 'cors'
        }
        const url = process.env.REACT_APP_API_LINK + "auth/master"
        const res = await fetch(url, init as RequestInit)
        if (res.status !== 200) {
            setError("masterPassword", { message: "incorrect password" })
            return
        }
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