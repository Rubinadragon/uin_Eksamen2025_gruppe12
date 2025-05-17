import { useEffect, useState } from "react";
import { fetchUserName } from "../fetchers/brukerServices";import EventCard from "../components/EventCard";
import "../assets/styles/dashboard.scss";
import UserDashboardView from "./UserDashboardView";

export default function Dashboard({ setIsLoggedIn, setCurrentUser, currentUser, wishlist, setWishlist }) {

  const handleLogin = async (x) => {
    x.preventDefault();
    const username = x.target.usernameInput.value;

    const user = await fetchUserName(username);

    if (user) {
      localStorage.setItem("loggedIn", user.name);
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