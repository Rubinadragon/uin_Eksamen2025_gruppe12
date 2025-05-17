import { useState, useEffect } from "react";
import { fetchMultipleEventsById } from "../fetchers/fetchTicketmaster";

import EventCard from "./EventCard";

export default function UserDashboardView({currentUser, wishlist, setWishlist}) {
  
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

    return (
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
                  {currentUser.friends != null ? currentUser.friends?.map((friend, index) => (
                    <li key={`friend_${index}`} className="friendCard">
                      <img src={friend.image.asset.url} alt={friend.image.alt} />
                      <article>
                        <h3>{friend.name}</h3>
                        {friend.friendWishlist.some((e) => e.id === wishlist.id) ? (
                          <p>Dere har samme event i ønskelisten, hva med å dra sammen på {friend.friendWishlist[0].tittel}?</p>
                        ) : <p>something</p>}
                      </article>
                    </li>
                  )) : <p>Ingen venner enda</p>}
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
                    linkToDetails={"sanity-event"}
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
                    linkToDetails={"sanity-event"}
                  />
                )}
              </section>
        </>
    );
}