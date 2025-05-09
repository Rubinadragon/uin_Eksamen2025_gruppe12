import { useState } from "react";
import { fetchUserName } from "../fetchers/brukerServices";

export default function Dashboard(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = async (x) => {
        x.preventDefault();
        const username = x.target.usernameInput.value;

        const user = await fetchUserName(username);
        if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
        } else {
            alert("Finner ikke bruker..");
        }
    };

    return (
        <section>
            {isLoggedIn && currentUser ? (
                <>
                    <h2>Min side</h2>
                    <p>Navn: {currentUser.name} </p>
                    <p>E-post: {currentUser.name} </p>
                    <p>Alder: {currentUser.age} </p>
                    {currentUser.image && (
                        <img src={currentUser.image.asset.url} alt={currentUser.image.alt} />
                    )}
                </>
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
            )}        
        </section>
    );
}