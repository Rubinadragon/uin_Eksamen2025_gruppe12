import EventCard from "./EventCard";
import CityEventCard from "./CityEventCard";
import {useState, useEffect} from "react";
import {fetchTenEventsByCity} from "../fetchers/fetchTicketmaster";


export default function Home({ selectedFestivals, wishlist, setWishlist }){
    const [city, setCity] = useState() 

    
    const getTenEventsByCity = async (name)=> {
    const data =  await fetchTenEventsByCity(name)
    setCity(data)
    }   

    useEffect(()=> {
    getTenEventsByCity("Oslo")
}, [])
    
    return (     
        <>
            <h1 id="frontHeader">De beste opplevelsene nær deg</h1>
            <section className="eventCards">
                <h2>Utvalgte festivaler</h2>
            {selectedFestivals?.map((festival, id) => (
                <EventCard key={`festival_${id}`} event={festival} wishlist={wishlist} setWishlist={setWishlist} linkToDetails={"event"}/>
            ))}
            </section>

        <section className="eventGrid">
             <h2>Hva skjer i verdens storbyer?</h2>

                <ul className="citybuttons">
                    <li><button className="cityBtn" onClick={()=> getTenEventsByCity("Oslo")}>Oslo</button></li>
                    <li><button className="cityBtn" onClick={()=> getTenEventsByCity("Stockholm")}>Stockholm</button></li>
                    <li><button className="cityBtn" onClick={()=> getTenEventsByCity("Berlin")}>Berlin</button></li>
                    <li><button className="cityBtn" onClick={()=> getTenEventsByCity("London")}>London</button></li>
                    <li><button className="cityBtn" onClick={()=> getTenEventsByCity("Edinburgh ")}>Edinburgh</button></li>
                </ul>
                  <h2>Hva skjer i {city?.[0]._embedded.venues[0].city.name}</h2>
            {city?.map((cit,index) => (
            <CityEventCard city={cit} key={`city_${index}`}/>
                ))}
        </section>
        </>
    )   
}
