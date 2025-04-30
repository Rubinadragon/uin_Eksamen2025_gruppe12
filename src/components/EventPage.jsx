import { useEffect, useState } from "react";
import { fetchAttractionsById } from "../fetchers/fetchTicketmaster";
import { useParams } from "react-router-dom";


export default function EventPage() {

    let { id } = useParams();

    const [attractionId, setAttractionId] = useState({});

    useEffect(() => {
        getAttractionById(id);
    }, 
    []);

    const getAttractionById = async (value) => {
        try {
            const response = await fetchAttractionById(value);
            setAttractionId(response);
        }
        catch(error) {
            console.error("Cannot fetch requested attraction!:", error)
        }
    };



    return (
        <h1>{attractionId.name}</h1>
    ) 
}