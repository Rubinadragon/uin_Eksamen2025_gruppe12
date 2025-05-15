import { useEffect, useState } from "react";
import { fetchUserName, fetchAllUsers } from "../fetchers/brukerServices";
import { fetchAllEvents } from "../fetchers/eventServices";
import { fetchMultipleEventsById } from "../fetchers/fetchTicketmaster";
import EventCard from "../components/EventCard";

export default function Dashboard({ setIsLoggedIn, setCurrentUser, currentUser, wishlist, setWishlist }) {
    
    const [allUsers, setAllUsers] = useState([]);

    const [wishlistData, setWishlistData] = useState([]);
    const [purchasedData, setPurchasedData] = useState([]);

    useEffect(() => {
      getUserEvents(wishlist, "wishlist")
    }, [wishlist])

    useEffect(() => {
      getUserEvents(currentUser?.previousPurchases, "purchased")
    }, [currentUser])

    const getUserEvents = async (arr, dataType) => {
      const tmpArr = arr?.map((e) => {
        return e.id || e.apiId;
      });
    
      try {
        const data = await fetchMultipleEventsById(tmpArr);

        if(dataType === "wishlist")
          setWishlistData(data);
        else if(dataType === "purchased")
          setPurchasedData(data);
      }
      catch(error) {
        console.log(error);
        return [];
      }
    }

    const handleLogin = async (x) => {
      x.preventDefault();
      const username = x.target.usernameInput.value;

      const user = await fetchUserName(username);

      if (user) {
        localStorage.setItem("loggedIn", JSON.stringify(user));
        setCurrentUser(user);
        setIsLoggedIn(true);
          
        setWishlist(user?.wishlist?.map((e) => {
          return {id: e.apiId, type: "event"}
        }))

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
                    {wishlistData?.map((wish, index) => 
                      <EventCard
                        key={`wish_${index}`}
                        event={wish}
                        wishlist={wishlist}
                        setWishlist={setWishlist}
                        linkToDetails={true}
                      />
                  )}

                    <h3>Mine kjøpte billetter:</h3>
                    {purchasedData?.map((purchased, index) =>
                      <EventCard
                        key={`purchased_${index}`}
                        event={purchased}
                        wishlist={wishlist}
                        setWishlist={setWishlist}
                        linkToDetails={true}
                      />
                  )}



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