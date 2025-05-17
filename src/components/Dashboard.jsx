import { useEffect, useState } from "react";
import { fetchUserName, fetchAllUsers } from "../fetchers/brukerServices";
import { fetchAllEvents } from "../fetchers/eventServices";
import { fetchMultipleEventsById } from "../fetchers/fetchTicketmaster";
import EventCard from "../components/EventCard";
import "../assets/styles/dashboard.scss";

export default function Dashboard({ setIsLoggedIn, setCurrentUser, currentUser, wishlist, setWishlist }) {

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
    currentUser ?
    <>
      <section className="profileOverview">
        <h1>Min side</h1>
        <article className="profileCard">
          {currentUser.image && (
            <img src={currentUser.image.asset.url} alt={currentUser.image.alt} />
          )}
          <h2>{currentUser.name} </h2>
          <p>E-post: {currentUser.email} </p>
          <p>Alder: {currentUser.age} </p>
        </article>
        <ul id="friendsList">
          <h2>Mine venner</h2>
          {currentUser.friends.map((friend, index) => (
            <li key={`friend_${index}`} className="friendCard">
              <img src={friend.image.asset.url} alt={friend.image.alt} />
              <article>
                <h3>{friend.name}</h3>
                {friend.friendWishlist.some((e) => e.id === wishlist.id) ? (
                  <p>Dere har samme event i ønskelisten, hva med å dra sammen på {friend.friendWishlist[0].tittel}?</p>
                ) : <p>something</p>}
              </article>
            </li>
          ))}
        </ul>

      </section>
      <section className="eventGrid">
        <h2>Min ønskeliste:</h2>
        {wishlistData?.map((wish, index) => 
          <EventCard
            key={`wish_${index}`}
            event={wish}
            wishlist={wishlist}
            setWishlist={setWishlist}
            linkToDetails={true}
          />
            )}
      </section>
      <section className="eventGrid">
        <h2>Mine kjøpte billetter:</h2>
        {purchasedData?.map((purchased, index) =>
          <EventCard
            key={`purchased_${index}`}
            event={purchased}
            wishlist={wishlist}
            setWishlist={setWishlist}
            linkToDetails={true}
          />
        )}
      </section>
      </>
      : (
          <section className="notLoggedIn">
            <h2>Logg inn</h2>
            <form onSubmit = {handleLogin}>
                <label htmlFor="usernameInput">Brukernavn</label>
                <input type="text" id="usernameInput" />
                <label htmlFor="passwordInput">Passord</label>
                <input type="text" id="passwordInput" />
                <button>Logg inn</button>
            </form>           
          </section>
  ))
}