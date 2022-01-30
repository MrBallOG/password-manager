import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../reducers";
import { NavigationBar } from "../utils/NavigationBar";
import { setToken } from "../actions/tokenActions";


export function Login() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const token = useSelector((state: RootState) => state.token)
    const dispatch = useDispatch()


    const handleLogin = async (data: any) => {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
            mode: 'cors',
            credentials: 'include'
        }
        const url = process.env.REACT_APP_API_LINK + "auth/login"
        const res = await fetch(url, init as RequestInit)

        if (res.status === 404) {
            const dict = await res.json()
            setError("email", { message: dict.detail })
            return
        }
        const dict = await res.json()
        dispatch(setToken(dict.token))
    }

    if (token.token !== "")
        return <Navigate to="/" />

    return (
        <>
            <NavigationBar />
            <div className="form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
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
                    <button>Send</button>
                </form>
            </div>
        </>
    )
}