import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleSanityEvent, fetchUserByWishList} from "../fetchers/eventServices";
import { fetchSingleEventsById } from "../fetchers/fetchTicketmaster";
import { formatDateNO } from "../assets/js/utils";
import ArtistCard from "./ArtistCard";
import EventHeader from "./EventHeader";
import "../assets/styles/sanityEventDetails.scss"

export default function SanityEventDetails({isLoggedIn}){
    let { apiId } = useParams() // Manglet paranteser
    const navigate = useNavigate();

    const [sanityEvent, setSanityEvent] = useState({});
    const [apiEvent, setApiEvent] = useState({})
    const [wishlistPeople, setWishlistPeople] = useState({})

    const localUser = localStorage.getItem("loggedIn");

    useEffect(() => {
        if(!localUser) {
            navigate("/", {replace: true});
        }
        else {
            getSingleSanityEvent(apiId);
            getEventDetails(apiId);
            getWishlistPeople(apiId);
        }
    }, [isLoggedIn])

    const getSingleSanityEvent = async (id) => {
        const data = await fetchSingleSanityEvent(id) 
        setSanityEvent(data) // Fjerne lookup på første index i array
    }

    const getWishlistPeople = async (id) => {
            const data = await fetchUserByWishList(id)
            setWishlistPeople(data)
        }

    const getEventDetails = async (value) => {
        try {
                const response = await fetchSingleEventsById(value); // Bytter til metode som fetcher eventer med id og ikke attractions
                setApiEvent(response);
            }
            catch(error) {
                console.error("Cannot fetch requested event!: ", error)
        }
    }

    return (
        <>
        <EventHeader attraction={apiEvent} location={apiEvent?._embedded?.venues[0]} />
        <section className="sanityEventDetails">
            <article>
                <p className="sanityGenre">{apiEvent?.classifications?.[0]?.genre?.name}</p>
                <p>Dato: {formatDateNO(apiEvent?.dates?.start?.localDate)}</p>
            </article>
        </section>
        <section className="sanityWishlist">
            <h2>Hvem har dette i ønskelisten</h2>
            {wishlistPeople?.[0]?.wishlisted?.map((person) => <ArtistCard key={person._id} artist={person} isProfile={true}/>)}
        </section>
        </>
    )
}