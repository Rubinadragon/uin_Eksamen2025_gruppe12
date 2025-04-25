import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home(){

    const [featuredFestivals, setFeaturedFestivals] = useState([]);

    const apiKey = "sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX";

    const getFeaturedFestivals = async () => {
        await fetch(`https://app.ticketmaster.com/discovery/v2/attractions?apikey=${apiKey}&id=K8vZ917oWOV,K8vZ917K7fV,K8vZ917bJC7,K8vZ917_YJf&locale=*`)
        .then((response) => response.json())
        .then((data) => setFeaturedFestivals(data._embedded.attractions));
    };

    useEffect(() => {
        getFeaturedFestivals();
        console.log(featuredFestivals);
    }, 
    []);

    return (     
        <>
            <section className="featuredFestivals">
                <h2>Festivaler</h2>
                {
                    featuredFestivals?.map((festival, id) => (
                        <Link to={`event/${festival.id}`} key={`featuredFestival_${id}`}>
                            <article>
                                <h3>{festival.name}</h3>
                            </article>
                        </Link>
                    ))
                }
            </section>
        </>
    )
    
}