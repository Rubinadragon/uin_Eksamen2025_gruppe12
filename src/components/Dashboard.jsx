import { useState } from "react";
import { fetchUserName, fetchAllUsers } from "../fetchers/brukerServices";
import { fetchAllEvents } from "../fetchers/eventServices";

export default function Dashboard({ setIsLoggedIn, setCurrentUser }) {
    const localUser = localStorage.getItem("loggedIn");
    const currentUser = localUser ? JSON.parse(localUser) : null;        
    const [allUsers, setAllUsers] = useState([]);
    const [allEvents, setAllEvents] = useState([]);

    const handleLogin = async (x) => {
        x.preventDefault();
        const username = x.target.usernameInput.value;

        const user = await fetchUserName(username);
        if (user) {
            localStorage.setItem("loggedIn", JSON.stringify(user));
            setCurrentUser(user);
            setIsLoggedIn(true);

            const users = await fetchAllUsers();
            setAllUsers(users);

            const events = await fetchAllEvents();
            setAllEvents(events);
          } else {
            alert("Finner ikke bruker..");
        }
    };

    return (
        <section>
            {currentUser ? (
                <>
                    <h2>Min side</h2>
                    <p>Navn: {currentUser.name} </p>
                    <p>E-post: {currentUser.email} </p>
                    <p>Alder: {currentUser.age} </p>
                    {currentUser.image && (
                        <img src={currentUser.image.asset.url} alt={currentUser.image.alt} />
                    )}

                    <h3>Alle events i Sanity:</h3>
                    <ul>
                        {allEvents.map(evnt => 
                            (
                            <li key={evnt.id}> {evnt.tittel} ({evnt.category}) </li>
                            ))
                        }
                    </ul>

                    <h3>Alle brukere i Sanity:</h3>
                    {allUsers.map(user => 
                    (
                        <div key={user._id}>
                            <p>{user.name}</p>
                            <img src={user.image.asset.url} alt={user.image.alt} />
                            <p>Wishlist: {user.wishlist.length} events </p>
                            <p>Purchases: {user.previousPurchases.length} events </p>
                            <ul>
                                {user.wishlist.map(wish => (
                                    <li key={wish._id}>Wishlist: {wish.tittel} </li>
                                ))}
                                {user.previousPurchases.map(purchase => (
                                    <li key={purchase._id}>Purchased: {purchase.tittel} </li>
                                ))}
                            </ul>
                        </div>
                    ))}
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