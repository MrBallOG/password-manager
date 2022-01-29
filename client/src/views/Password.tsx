import { useState } from "react";
import { Dispatch } from "redux"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IPassword } from "../reducers/passwords";
import { handleAddPassword, handleDeletePassword, handleGetAllPasswords, handleUpdatePassword } from "../utils/passwordsFetchHandlingUtils";

export interface IPasswordProps {
    dispatch: Dispatch<any>
    token: any
    vaultKey: string
    password: IPassword
    postOnSave: boolean
}


export function Password(props: IPasswordProps) {
    const { register, handleSubmit, setError, formState: { errors } } = useForm()
    const navigate = useNavigate()
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

    const compare = (password: IPassword) => {
        if (password.email !== props.password.email)
            return false
        if (password.password !== props.password.password)
            return false
        if (password.service !== props.password.service)
            return false
        if (password.username !== props.password.username)
            return false
        return true
    }

    const handleSave = async (data: any) => {
        const password: IPassword = {
            id: props.password.id,
            service: data.service,
            username: data.username,
            email: data.email,
            password: data.password
        }
        if (compare(password)) {
            setError("service", { message: "change any field before saving" })
            return
        }
        if (props.postOnSave) {
            await handleAddPassword(password, props.token, props.vaultKey, props.dispatch)
            navigate("/vault")
        } else {
            await handleUpdatePassword(password, props.token, props.vaultKey, props.dispatch)
            await handleGetAllPasswords(props.token, props.vaultKey, props.dispatch)
        }
    }

    const handleDelete = async () => {
        if (props.postOnSave) {
            navigate("/vault")
        } else {
            await handleDeletePassword(props.password.id as number, props.token, props.vaultKey, props.dispatch)
            await handleGetAllPasswords(props.token, props.vaultKey, props.dispatch)
        }
    }


    return (
        <>
            <div className="container">
                <div className="password">
                    <div className="inputs">
                        {errors.service ? errors.service.message : ""}
                        <p>
                            <label>Service</label>
                            <input type="text" {...register('service', {
                                required: true,
                                value: props.password.service,
                                maxLength: { value: 60, message: "service must be max 60 characters" }
                            })} />
                        </p>
                        {errors.username ? errors.username.message : ""}
                        <p>
                            <label>Username</label>
                            <input type="text" {...register('username', {
                                required: true,
                                value: props.password.username,
                                maxLength: { value: 50, message: "username must be max 50 characters" }
                            })} />
                        </p>
                        {errors.email ? errors.email.message : ""}
                        <p>
                            <label>Email</label>
                            <input type="text" {...register('email', {
                                required: true,
                                value: props.password.email,
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "invalid email"
                                },
                                maxLength: { value: 254, message: "email must be max 254 characters" }
                            })} />
                        </p>
                        {errors.password ? errors.password.message : ""}
                        <p>
                            <label>Password</label>
                            <input type={inputType} {...register('password', {
                                required: true,
                                value: props.password.password,
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/,
                                    message: "password must contain A-Z, a-z, 0-9, and special characters"
                                },
                                minLength: { value: 8, message: "password must be at least 8 characters" },
                                maxLength: { value: 50, message: "password must be max 50 characters" }
                            })} />
                        </p>
                    </div>
                    <button className="save" onClick={handleSubmit(handleSave)}>{props.postOnSave ? "Create" : "Save"}</button>
                    <button className="delete" onClick={handleDelete}>{props.postOnSave ? "Abort" : "Delete"}</button>
                    <button onClick={handleInputType}>{name}</button>
                </div>
            </div>
        </>
    )
}