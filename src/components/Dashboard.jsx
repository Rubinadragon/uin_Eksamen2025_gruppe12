import { useEffect, useState } from "react";
import { fetchUserName } from "../fetchers/brukerServices";import EventCard from "../components/EventCard";
import "../assets/styles/dashboard.scss";
import UserDashboardView from "./UserDashboardView";

export default function Dashboard({ setIsLoggedIn, setCurrentUser, currentUser, wishlist, setWishlist }) {

  //B-KRAV
  // const [allUsers, setAllUsers] = useState([]);
  // const [allEvents, setAllEvents] = useState([]);

  // B-KRAV 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const users = await fetchAllUsers();
  //     setAllUsers(users);
  //     const events = await fetchAllEvents();
  //     setAllEvents(events);
  //   };
  //   fetchData();
  // }, []);

  const handleLogin = async (x) => {
    x.preventDefault();
    const username = x.target.usernameInput.value;

    const user = await fetchUserName(username);

    if (user) {
      localStorage.setItem("loggedIn", JSON.stringify({isLoggedIn: true, username: user.name}));
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
      <UserDashboardView currentUser={currentUser} wishlist={wishlist} setWishlist={setWishlist} />
      /* B-KRAV
    <section>
      <h3>Alle events i Sanity:</h3>
      <ul>
        {allEvents.map(evnt => (
          <li key={evnt.id}> {evnt.tittel} ({evnt.category}) </li>
        ))}
      </ul>

      <h3>Alle brukere i Sanity:</h3>
      {allUsers.map(user => (
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
    </section>
    */
      : (
          <section className="notLoggedIn">
            <h1>Logg inn</h1>
            <form onSubmit = {handleLogin}>
                <label htmlFor="usernameInput">Brukernavn</label>
                <input type="text" id="usernameInput" />
                <label htmlFor="passwordInput">Passord</label>
                <input type="text" id="passwordInput" />
                <button>Logg inn</button>
            </form>           
          </section>
  ));
}