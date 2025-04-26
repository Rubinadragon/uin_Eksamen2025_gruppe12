import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSelectedFestivals } from "../fetchers/fetchTicketmaster";

export default function Home(){

    const [selectedFestivals, setSelectedFestivals] = useState([]);

    useEffect(() => {
        const getSelectedFestivals = async () => {
            try {
                const response = await fetchSelectedFestivals();
                setSelectedFestivals(response);
            }
            catch(error) {
                console.error("Cannot fetch festivals!:", error)
            }
        };
        getSelectedFestivals();
    }, 
    []);

    return (     
        <>
            <h1>De beste opplevelsene nær deg</h1>
            <section className="eventCards">
                <h2>Utvalgte festivaler</h2>
                {
                    selectedFestivals?.map((festival, id) => (
                        <Link to={`event/${festival.id}`} key={`selectedFestival_${id}`}>
                            <article>
                                <h3>{festival.name}</h3>
                                <span>Les mer</span>
                            </article>
                        </Link>
                    ))
                }
            </section>
        </>
    )   
}