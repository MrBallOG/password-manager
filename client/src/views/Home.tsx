import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { NavigationBar } from "../utils/NavigationBar";
import { checkIfLoggedIn } from "../utils/checkLoggedIn";


export function Home() {
    const [ready, setReady] = useState(false)
    const token = useSelector((state: RootState) => state.token)
    const dispatch = useDispatch()

    useEffect(() => {
        const checkLoggedIn = async () => {
            await checkIfLoggedIn(token.token, dispatch, setReady)
        }
        checkLoggedIn()
    }, [dispatch, token.token])

    if (!ready)
        return (<></>)

    return (
        <>
            <NavigationBar />
            <h1 style={{ fontSize: 60, marginTop: 100 }}>Password Manager</h1>
        </>
    )
}