import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { NavigationBar } from "../utils/NavigationBar";
import { IPasswordProps, Password } from "./Password";
import { Navigate } from "react-router-dom";

export function AddPassword() {
    const token = useSelector((state: RootState) => state.token)
    const vaultKey = useSelector((state: RootState) => state.vaultKey)
    const dispatch = useDispatch()
    const props: IPasswordProps = {
        dispatch: dispatch,
        token: token,
        vaultKey: vaultKey,
        password: { id: undefined, password: "", email: "", service: "", username: "" },
        postOnSave: true
    }

    if (token.token === "")
        return <Navigate to="/login" />

    if (vaultKey === "") {
        return <Navigate to="/vault" />
    }

    return (
        <>
            <NavigationBar />
            <div style={{ marginTop: 200 }}>
                <h2>Add Password</h2>
                <Password {...props} />
            </div>
        </>
    )
}