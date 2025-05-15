import EventCard from "./EventCard";
import CityEventCard from "./CityEventCard";

export default function Home({ selectedFestivals, wishlist, setWishlist }){

    //Funksjoner for valg av byer
    let city_name = "Oslo"

    function Oslo() {
    city_name = "Oslo"
    fetchTenEventsByCity()
    console.log("city:",city_name)
}
    function Stockholm() {
        city_name = "Stockholm"
        fetchTenEventsByCity()
        console.log("city:",city_name)
    }
    function Berlin() {
        city_name = "Berlin"
        fetchTenEventsByCity()
        console.log("city:",city_name)
    }
    function London() {
        city_name = "London"
        fetchTenEventsByCity()
        console.log("city:",city_name)
    }
 
    return (     
        <>
            <h1 id="frontHeader">De beste opplevelsene nær deg</h1>
            <section className="eventCards">
                <h2>Utvalgte festivaler</h2>
            {
                selectedFestivals?.map((festival, id) => (
                <EventCard key={`festival_${id}`} event={festival} wishlist={wishlist} setWishlist={setWishlist} linkToDetails={true}/>
            ))}

            </section>
            <section className="tenCitys"> 
                <h2>Hva skjer i verdens storbyer?</h2>
                <ul className="cityButton">
                    <li><button onClick={Oslo}>Oslo</button></li>
                    <li><button onClick={Stockholm}>Stockholm</button></li>
                    <li><button onClick={Berlin}>Berlin</button></li>
                <li><button onClick={London}>London</button></li>
            </ul>
               {<CityEventCard city_name={city_name}/>}
            </section>
        </>
    )   
}
