import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSanityEvents , fetchSingleSanityEvent} from "../fetchers/eventServices";
import { fetchSingleAttractionById } from "../fetchers/fetchTicketmaster";

export default function SanityEventDetails(){
    let { apiId } = useParams

    const [sanityEvent, setSanityEvent] = useState({});
    const [ApiEvent, setApiEvent] = useState({})

    useEffect(() => {
        //getEventFromSanityByApiId()
        getSingleSanityEvent(apiId)
        //getEventDetails()
    }, [])

    /*const getEventFromSanityByApiId = async () => {
        const sanityData = await fetchSanityEvents()
        console.log(sanityData)
        setSanityEvent()
    }*/

    const getSingleSanityEvent = async (apiId) => {
        const data = await fetchSingleSanityEvent(apiId)
        setSanityEvent(data[0])
        //console.log(apiId)
        console.log(apiId)
    }

    console.log(fetchSingleSanityEvent())
    /*const getEventDetails = async (value) => {
        try {
                const response = await fetchSingleAttractionById(value);
                console.log(response)
                setAttraction(response);
            }
            catch(error) {
                console.error("Cannot fetch requested attraction!:", error)
        }
    }*/

    //console.log(fetchSanityEvents)
    //const getEventDetails = async 

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