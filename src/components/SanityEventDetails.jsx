import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleSanityEvent} from "../fetchers/eventServices";
import { fetchSingleEventsById } from "../fetchers/fetchTicketmaster";

export default function SanityEventDetails(){
    let { apiId } = useParams() // Manglet paranteser

    const [sanityEvent, setSanityEvent] = useState({});
    const [ApiEvent, setApiEvent] = useState({})

    useEffect(() => {
        //getEventFromSanityByApiId()
        getSingleSanityEvent(apiId)
        getEventDetails(apiId)
    }, [])

    /*const getEventFromSanityByApiId = async () => {
        const sanityData = await fetchSanityEvents()
        console.log(sanityData)
        setSanityEvent()
    }*/

    const getSingleSanityEvent = async (id) => {
        const data = await fetchSingleSanityEvent(id) 
        setSanityEvent(data) // Fjerne lookup på første index i array
        //console.log(apiId)
        //console.log()
    }

    //console.log(fetchSingleSanityEvent())
    const getEventDetails = async (value) => {
        try {
                const response = await fetchSingleEventsById(value); // Bytter til metode som fetcher eventer med id og ikke attractions
                console.log(response)
                //setAttraction(response);
            }
            catch(error) {
                console.error("Cannot fetch requested attraction!:", error)
        }
    }

    //console.log(fetchSanityEvents)
    //const getEventDetails = async 

    //console.log(sanityEvent)

    return (<section className="SanityEventDetails">
            <h1>{setSanityEvent.name}</h1>
            <article>
                <h2>Dato og sted</h2>
                <p>Dato: <span>test</span></p>
                <p>Sted: <span>test</span></p>
            </article>
            <article>
                <h2>Sjanger</h2>
                <span>test</span>
            </article>
            <article>
                <h2>Hvem har dette i ønskelisten</h2>
                <p>Sett inn profil her</p>
            </article>
        </section>)
}