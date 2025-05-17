import EventCard from "./EventCard";
import CityEventCard from "./CityEventCard";

export default function Home({ selectedFestivals, wishlist, setWishlist }){
 
    return (     
        <>
            <h1 id="frontHeader">De beste opplevelsene nær deg</h1>
            <section className="eventCards">
                <h2>Utvalgte festivaler</h2>
            {
                selectedFestivals?.map((festival, id) => (
                <EventCard key={`festival_${id}`} event={festival} wishlist={wishlist} setWishlist={setWishlist} linkToDetails={"event"}/>
            ))}

            </section>
            <section className="tenCitys"> 
                <h2>Hva skjer i verdens storbyer?</h2>
               {<CityEventCard/>}
            </section>
        </>
    )   
}
