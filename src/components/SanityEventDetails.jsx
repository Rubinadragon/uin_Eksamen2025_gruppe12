import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleSanityEvent, fetchUserByWishList} from "../fetchers/eventServices";
import { fetchSingleEventsById } from "../fetchers/fetchTicketmaster";
import { loadEventImg, formatDateNO } from "../assets/js/utils";
import ArtistCard from "./ArtistCard";
import "../assets/styles/sanityEventDetails.scss"

export default function SanityEventDetails(){
    let { apiId } = useParams() // Manglet paranteser

    const [sanityEvent, setSanityEvent] = useState({});
    const [apiEvent, setApiEvent] = useState({})
    const [wishlistPeople, setWishlistPeople] = useState({})

    useEffect(() => {
        getSingleSanityEvent(apiId)
        getEventDetails(apiId)
        getWishlistPeople(apiId)
    }, [])

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

    console.log(apiEvent)
    return (<section className="sanityEventDetails">
            <img src={loadEventImg(apiEvent, 600, 2500)} alt={`${apiEvent?.name} banner`}/>
            <h1>{apiEvent.name}</h1>
            <article className="sanityEventInfo">
                <p className="sanityGenre">{apiEvent?.classifications?.[0]?.genre?.name}</p>
                <p className="sanityDate">{apiEvent?.dates?.start?.localDate}</p>
                <p className="sanityVenue">{apiEvent?._embedded?.venues[0]?.name}</p>
            </article>
            <section className="sanityWishlist">
                <h2>Hvem har dette i ønskelisten</h2>
                {wishlistPeople?.[0]?.wishlisted?.map((person) => <ArtistCard key={person._id} artist={person} isProfile={true}/>)}
            </section>
        </section>)
}