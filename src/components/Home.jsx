import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { fetchAttractionsById } from "../fetchers/fetchTicketmaster";
import EventCard from "./EventCard";
import CityEventCard from "./CityEventCard";

export default function Home({ wishlist, setWishlist }){

    const [selectedFestivals, setSelectedFestivals] = useState([]);

    useEffect(() => {
        getSelectedFestivals("K8vZ917oWOV,K8vZ917K7fV,K8vZ917bJC7,K8vZ917_YJf");
    }, 
    []);

    const getSelectedFestivals = async (festivalIds) => {
        try {
            const response = await fetchAttractionsById(festivalIds);
            setSelectedFestivals(response);
        }
        catch(error) {
            console.error("Cannot fetch festivals!:", error)
        }
    };
 
    return (     
        <>
            <h1 id="frontHeader">De beste opplevelsene nær deg</h1>
            <section className="eventCards">
                <h2>Utvalgte festivaler</h2>
            {
                selectedFestivals?.map((festival, id) => (
                <EventCard key={`festival_${id}`} event={festival} wishlist={wishlist} setWishlist={setWishlist} linkToDetails={true}/>
            ))}

            </section>
            <section className="tenCitys"> 
                <h2>Hva skjer i verdens storbyer?</h2>
               {<CityEventCard/>}
            </section>
        </>
    )   
}
