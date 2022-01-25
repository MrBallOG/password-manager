import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../reducers";
import { NavigationBar } from "../utils/NavigationBar";

export function Login() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [redirect, setRedirect] = useState(false)
    const token = useSelector((state: RootState) => state.token)
    //useDispatch

    const handleLogin = async (data: any) => {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password
            }),
            mode: 'cors'
        }
        const url = process.env.REACT_APP_API_LINK + "auth/login"
        const res = await fetch(url, init as RequestInit)
        if (res.status === 404) {
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
                <h2>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
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
                    <button>Send</button>
                </form>
            </div>
        </>
    )
}