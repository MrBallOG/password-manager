import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { NavigationBar } from "../utils/NavigationBar";
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { IPasswordProps, Password } from "./Password";
import { IMasterLoginProps, MasterLogin } from "./MasterLogin";
import { handleGetAllPasswords } from "../utils/passwordsFetchHandlingUtils";


export function Vault() {
    const navigate = useNavigate()
    const token = useSelector((state: RootState) => state.token)
    const vaultKey = useSelector((state: RootState) => state.vaultKey)
    const passwords = useSelector((state: RootState) => state.passwords)
    const dispatch = useDispatch()


    useEffect(() => {
        if (vaultKey !== "") {
            const getPasswords = async () => {
                await handleGetAllPasswords(token, vaultKey, dispatch)
            }
            const ac = new AbortController()
            getPasswords()
            return () => ac.abort()
        }
    }, [dispatch, navigate, token, vaultKey])

    if (token.token === "")
        return <Navigate to="/login" />

    if (vaultKey === "") {
        const props: IMasterLoginProps = {
            dispatch: dispatch,
            token: token
        }
        return <MasterLogin {...props} />
    }

    return (
        <>
            <NavigationBar />
            <h1>Passwords</h1>
            <button className="simple" onClick={() => navigate("/vault/add")}>Add Password</button>
            {passwords.map((password) => {
                let props: IPasswordProps = {
                    dispatch: dispatch,
                    token: token,
                    vaultKey: vaultKey,
                    password: password,
                    postOnSave: false
                }

                return <Password key={password.id as number} {...props} />
            })}
        </>
    )
}