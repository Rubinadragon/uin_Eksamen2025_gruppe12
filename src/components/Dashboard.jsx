import { useState } from "react";
import { fetchUserName, fetchAllUsers } from "../fetchers/brukerServices";
import { fetchAllEvents } from "../fetchers/eventServices";
import { fetchSingleEventById } from "../fetchers/fetchTicketmaster";
import EventCard from "../components/EventCard";

export default function Dashboard({ setIsLoggedIn, setCurrentUser }) {
    const localUser = localStorage.getItem("loggedIn");
    const currentUser = localUser ? JSON.parse(localUser) : null;        
    const [allUsers, setAllUsers] = useState([]);
    const [allEvents, setAllEvents] = useState([]);

    const [userWishlist, setUserWishlist] = useState(() => {
      const chached = localStorage.getItem("userWishlist");
      return chached ? JSON.parse(chached) : [];
    });


    const [userPurchased, setUserPurchased] = useState(() => {
      const chached = localStorage.getItem("userPurchased");
      return chached ? JSON.parse(chached) : [];
    });

    const handleLogin = async (x) => {
        x.preventDefault();
        const username = x.target.usernameInput.value;

        const user = await fetchUserName(username);

        console.log("Fetched user object from Sanity:", user);

        if (user) {
            localStorage.setItem("loggedIn", JSON.stringify(user));
            setCurrentUser(user);
            setIsLoggedIn(true);


            // B-KRAV 
            //const users = await fetchAllUsers();
            //setAllUsers(users);
            //const events = await fetchAllEvents();
            //setAllEvents(events);


            //Promise.all venter til fetch-kallene er ferdige før den returnerer en samlet array med resultater.
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
            const wishlistUser = await Promise.all(
              user.wishlist
                .filter((evnt) => evnt.apiId)
                .map(async (evnt) => {const tmDetails = await fetchSingleEventById(evnt.apiId);
                    if (!tmDetails) return null;
                    tmDetails.type = "event";
                    return { ...evnt, ticketmaster: tmDetails };
                })
            );

            const workingWishlist = wishlistUser.filter(
            (item) => item !== null && item !== undefined);

            console.log("Wishlist fetched from Ticketmaster:", workingWishlist);

            setUserWishlist(workingWishlist);
            localStorage.setItem("userWishlist", JSON.stringify(workingWishlist));            
            

            const purchasedUser = await Promise.all(
              user.previousPurchases
                .filter((evnt) => evnt.apiId)
                .map(async (evnt) => {
                  const tmDetails = await fetchSingleEventById(evnt.apiId);
                  if (!tmDetails) return null;
                  tmDetails.type = "event";
                  return { ...evnt, ticketmaster: tmDetails };
                })
            );

          const workingPurchased = purchasedUser.filter(
          (item) => item !== null && item !== undefined);

          console.log("Purchases fetched from Ticketmaster:", workingPurchased);

          setUserPurchased(workingPurchased);
          localStorage.setItem("userPurchased", JSON.stringify(workingPurchased));          

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


                    <h3>Min ønskeliste:</h3>
                    {userWishlist.map((event, index) => (
                      event.ticketmaster ? (
                      <EventCard
                        key={event.ticketmaster?.id || index}
                        event={event.ticketmaster}
                        wishlist={currentUser?.wishlist}
                        linkToDetails={true}
                      />
                    ) : null
                  ))}

                    <h3>Mine kjøpte billetter:</h3>
                    {userPurchased.map((event, index) => (
                      event.ticketmaster ? (
                      <EventCard
                        key={event.ticketmaster?.id || index}
                        event={event.ticketmaster}
                        wishlist={currentUser?.wishlist}
                        linkToDetails={true}
                      />
                    ) : null
                  ))}



                  {/*
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
                        */}
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