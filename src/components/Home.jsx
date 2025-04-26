import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home(){

    const [selectedFestivals, setSelectedFestivals] = useState([]);

    const apiKey = "sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX";

    const getSelectedFestivals = async () => {
        await fetch(`https://app.ticketmaster.com/discovery/v2/attractions?apikey=${apiKey}&id=K8vZ917oWOV,K8vZ917K7fV,K8vZ917bJC7,K8vZ917_YJf&locale=*`)
        .then((response) => response.json())
        .then((data) => setSelectedFestivals(data._embedded.attractions));
    };

    useEffect(() => {
        getSelectedFestivals();
        console.log(featuredFestivals);
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