import { useState } from "react";
import { useForm } from "react-hook-form";
import { IPassword } from "../reducers/passwords";

export function Password(password: IPassword) {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [inputType, setInputType] = useState("password")
    const [name, setName] = useState("Show")

    const handleInputType = () => {
        if (inputType === "password") {
            setInputType("text")
            setName("Hide")
        }
        else {
            setInputType("password")
            setName("Show")
        }
    }

    const handleSave = async (data: any) => {
        // const init = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: data.email,
        //         password: data.password
        //     }),
        //     mode: 'cors',
        //     credentials: 'include'
        // }
        // const url = process.env.REACT_APP_API_LINK + "auth/login"
        // const res = await fetch(url, init as RequestInit)
        // if (res.status === 404) {
        //     const dict = await res.json()
        //     setError("email", { message: dict.detail })
        //     return
        // }
        // const dict = await res.json()
        // dispatch(setToken(dict.token))
    }

    return (
        <>
            <div className="container">
                <div className="password">
                    <div className="inputs">
                        <p>
                            <label>Service</label>
                            <input type="text" {...register('service', { required: true, value: password.service, maxLength: { value: 60, message: "service must be max 60 characters" } })} />
                        </p>
                        <p>
                            <label>Username</label>
                            <input type="text" {...register('username', { required: true, value: password.username, maxLength: { value: 50, message: "username must be max 50 characters" } })} />
                        </p>
                        <p>
                            <label>Email</label>
                            <input type="email" {...register('email', {
                                required: true,
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "invalid email"
                                },
                                maxLength: { value: 254, message: "email must be max 254 characters" }
                            })} />
                        </p>
                        <p>
                            {errors.password ? errors.password.message : ""}
                            <label>Password</label>
                            <input type={inputType} {...register('password', {
                                required: true,
                                value: password.password,
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                                    message: "password must contain A-Z, a-z, 0-9, and special characters"
                                },
                                minLength: { value: 8, message: "password must be at least 8 characters" },
                                maxLength: { value: 20, message: "password must be max 20 characters" }
                            })} />
                        </p>
                    </div>
                    <button className="save" onClick={handleSubmit(handleSave)}>Save</button>
                    <button className="delete">Delete</button>
                    <button className="simple" onClick={handleInputType}>{name}</button>
                </div>
            </div>
        </>
    )
}