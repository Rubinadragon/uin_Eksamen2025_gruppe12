import { useEffect, useState } from "react";
import { fetchEventSearchInfo } from "../fetchers/fetchTicketmaster";
import { useParams } from "react-router-dom";
import "../assets/styles/eventPage.scss"
import EventCard from "./EventCard";
import ArtistCard from "./ArtistCard";

export default function EventPage({selectedFestivals}) {
    let { id } = useParams();

    const [eventSearch, setEventSearch] = useState([])

    const getEventSearchByAttractionId = async (value) =>
    {
        try {
            const response = await fetchEventSearchInfo(value)
            setEventSearch(response)
            //console.log(response)
        }
        catch(error){
            console.error("Cannot fetch requested event search!:", error)
        }
    }
    //const test = city?.map(testy => testy?._embedded.venues)console.log("test",test)


    //const mapEvent = eventSearch?.events?.map((singleEvent) => singleEvent)
    //console.log(mapEvent)
    //console.log(mapEvent)
    //console.log(eventSearch?.events?.[2]._embedded)
    //console.log(eventSearch)
    //console.log(eventSearch?.events)
    //console.log(attraction)

    const currentAttraction = selectedFestivals.find((e) => e.id === id);

    console.log(currentAttraction)
    return (
        <section className="eventPageInfo">
            <h1>{currentAttraction.name}</h1>
            <article>
                <p>Sjanger:
                    {/*Filtrer ikke ut Undefined og får heller ikke med seg alle sjangere*/}
                    {/*mapEvent?.[1].classifications?.reduce((acc, current) => {
                        let undefinedName = acc.find(item => {return item?.genre?.name === "Undefined"})
                        let exists = acc.find( item => {return item?.genre?.id === current?.genre?.id
                        })
                        if(!exists || !undefinedName){
                            acc = acc.concat(current)
                        }
                        return acc
                    }, []
                    ).map((events) => <span key={events?.genre?.id}>{events?.genre?.name}</span>)*/}

                    {/*Metoden under skal gi alle sjangere fra alle objekter, men får ikke filtrert ut den heller*/}
                    {/*mapEvent?.map((festival) => 
                        festival?.classifications?.reduce((acc, obj) => {
                            if(!acc.some(o => o?.genre?.id === obj?.genre?.id) || !acc.some(o => o?.genre?.name === "Undefined")){
                                acc.push(obj)
                                console.log(acc)
                            }
                            return acc
                    }, [])
                    .map((genre) => <span key={genre?.genre?.id}>{genre?.genre?.name}</span>))*/}
                    {/*mapEvent?.reduce((acc, obj) => {
                        if(!acc.some(o => o?.classifications?.genre?.id)){

                        }
                    })*/}</p>
                <h2>Festivalpass</h2>
                <ul>
                    {/*eventSearch?.events?.map((festival) => <li key={festival.id}><EventCard event={festival} linkToDetails={false} attraction={attraction}/></li>)*/}
                </ul>
                <h2>Artister</h2>
                <ul>
                {/*Filterer ikke ut festivalnavn slik jeg ønsker*/}
                    {/*mapEvent?.map((events) => 
                        (events?._embedded?.attractions?.reduce(
                            (acc, obj) => {
                                if(!acc.some(o => o?.id === obj?.id) || !acc.some(o => o?.name === attraction?.name)){
                                    acc.push(obj)
                                    //console.log(attraction?.name)
                                    //console.log(obj?.name)
                                    //console.log(acc)
                                }
                                //console.log(obj)
                            return acc}, 
                            []).map
                            ((artist) => 
                            <li key={artist?.id}>
                                <ArtistCard artist={artist}/>
                            </li>)
                        )
                    )*/}
                </ul>
            </article>
        </section>
    ) 
}//https://stackoverflow.com/questions/74442594/how-to-remove-data-with-same-id-in-an-array-of-object-using-javascript