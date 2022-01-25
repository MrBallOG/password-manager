import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { NavigationBar } from "../utils/NavigationBar";
import '../utils/style.css'

export function Register() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [redirect, setRedirect] = useState(false)

    const handleRegister = async (data: any) => {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password,
                master_password: data.masterPassword
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
        setRedirect(true)
    }

    if (redirect)
        return <Navigate to='/' />

    return (
        <>
            <NavigationBar />
            <div className="form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <label>Username <br />
                        <input {...register('username', { required: true })} />
                    </label>
                    {errors.email ? errors.email.message : ""}
                    <label>Email <br />
                        <input type="email" {...register('email', { required: true })} />
                    </label>
                    {errors.password ? errors.password.message : ""}
                    <label>Password <br />
                        <input type="password" {...register('password', {
                            required: true,
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,20}$/i,
                                message: "password must contain A-Z, a-z, 0-9, and special characters"
                            },
                            minLength: { value: 8, message: "password must be at least 8 characters" },
                            maxLength: { value: 20, message: "password must be max 20 characters" }
                        })} />
                    </label>
                    {errors.masterPassword ? errors.masterPassword.message : ""}
                    <label>Master Password <br />
                        <input type="password" {...register('masterPassword', {
                            required: true,
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{12,20}$/i,
                                message: "password must contain A-Z, a-z, 0-9, and special characters"
                            },
                            minLength: { value: 12, message: "master password must be at least 12 characters" },
                            maxLength: { value: 20, message: "master password must be max 20 characters" }
                        })} />
                    </label>
                    <button>Send</button>
                </form>
            </div>

        </>
    )
}