import { useState } from "react";

export default function Dashboard(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (x) => {
        x.preventDefault();
        setIsLoggedIn(true);
    };

    return (
        <section>
        {isLoggedIn ? (
            <h2>Min side</h2>
        ) : (
            <>
            <h2>Logg inn</h2>
            <form onSubmit = {handleLogin}>
                <label htmlFor="usernameInput">Brukernavn</label>
                <input type="text" id="usernameInput" />
                <label htmlFor="passwordInput">Passord</label>
                <input type="text" id="passwordInput" />
                <button>Logg inn</button>
            </form>
            </>
        ) }
    </section>
);
}