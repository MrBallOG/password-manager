import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { NavigationBar } from "../utils/NavigationBar";
import '../utils/style.css'
import { RootState } from '../reducers';
import { useSelector } from 'react-redux';
import { deriveAuthKeyFromEmail, deriveVaultKeyFromEmail } from '../utils/masterPasswordUtils';


export function Register() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const token = useSelector((state: RootState) => state.token)


    const handleRegister = async (data: any) => {
        const vaultKey = deriveVaultKeyFromEmail(data.email, data.masterPassword)
        const authKey = deriveAuthKeyFromEmail(data.email, vaultKey)

        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                master_password: authKey
            }),
            mode: 'cors'
        }
        const url = process.env.REACT_APP_API_LINK + "auth/register"
        const res = await fetch(url, init as RequestInit)

        if (res.status === 409) {
            const dict = await res.json()
            setError("email", { message: dict.detail })
            return
        }
        navigate("/login")
    }

    if (token.token !== "")
        return <Navigate to="/" />

    return (
        <>
            <NavigationBar />
            <div className="form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit(handleRegister)}>
                    {errors.email ? errors.email.message : ""}
                    <label>Email <br />
                        <input type="text" {...register('email', {
                            required: true,
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "invalid email"
                            },
                            maxLength: { value: 254, message: "email must be max 254 characters" }
                        })} />
                    </label>
                    {errors.password ? errors.password.message : ""}
                    <label>Password <br />
                        <input type="password" {...register('password', {
                            required: true,
                            pattern: {
                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/,
                                message: "password must contain A-Z, a-z, 0-9, and special characters"
                            },
                            minLength: { value: 8, message: "password must be at least 8 characters" },
                            maxLength: { value: 50, message: "password must be max 50 characters" }
                        })} />
                    </label>
                    {errors.masterPassword ? errors.masterPassword.message : ""}
                    <label>Master Password <br />
                        <input type="password" {...register('masterPassword', {
                            required: true,
                            pattern: {
                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,50}$/,
                                message: "password must contain A-Z, a-z, 0-9, and special characters"
                            },
                            minLength: { value: 12, message: "master password must be at least 12 characters" },
                            maxLength: { value: 50, message: "master password must be max 50 characters" }
                        })} />
                    </label>
                    <button>Send</button>
                </form>
            </div>

        </>
    )
}