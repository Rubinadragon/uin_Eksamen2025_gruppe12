import { useEffect, useState } from "react";
import { fetchSingleAttractionById } from "../fetchers/fetchTicketmaster";
import { useParams } from "react-router-dom";


export default function EventPage() {

    let { id } = useParams();

    const [attraction, setAttraction] = useState({});

    useEffect(() => {
        getAttractionById(id);
    }, 
    []);

    const getAttractionById = async (value) => {
        try {
            const response = await fetchSingleAttractionById(value);
            setAttraction(response);
        }
        catch(error) {
            console.error("Cannot fetch requested attraction!:", error)
        }
    };

    return (
        <h1>{attraction.name}</h1>
    ) 
}
