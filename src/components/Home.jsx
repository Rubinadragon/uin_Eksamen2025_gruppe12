import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAttractionsById } from "../fetchers/fetchTicketmaster";

export default function Home(){

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