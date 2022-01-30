import { NavigationBar } from "../utils/NavigationBar";
import { ReactComponent as Padlock } from "../utils/padlock.svg"


export function Home() {
    return (
        <>
            <NavigationBar />
            <div className="center">
                <h1>Password Manager</h1>
                <Padlock height={200} width={200} />
            </div>
        </>
    )
}