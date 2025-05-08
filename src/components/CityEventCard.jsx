import { useEffect, useState } from "react";
import "../assets/styles/cityEventCard.scss"


export default function CityEventCard(){
//const {city_name} = useParams()
const [city, setCity] = useState()

let city_name = "Oslo"
   
//Fetch for 10 events for diffrent citys
const fetchTenEventsByCity = async()=> {
  await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX&locale=*&size=10&city=${city_name}`)
  .then((response) => response.json())
  .then((data)=> setCity(data._embedded.events))
  .catch((error) => console.error("An error accord during a fetch of citys", error))
}



 const test = city?.map(testy => testy?._embedded.venues[0])


useEffect(()=> {
    fetchTenEventsByCity()
}, [])

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
   
    return(
    <>
        <ul className="cityButton">
            <li><button onClick={Oslo}>Oslo</button></li>
            <li><button onClick={Stockholm}>Stockholm</button></li>
            <li><button onClick={Berlin}>Berlin</button></li>
            <li><button onClick={London}>London</button></li>
        </ul>

        <h3>Hva skjer i {test?.[0].city.name}</h3>
        {city?.map(cit => 
            
                  <article key={cit.id}> 
                  <h4>{cit.name}</h4>
                  <img src={
                    cit.images.find((img) => img.ratio === "16_9" && (img.width < 800 && img.width > 300)).url}
                    alt={cit.name}/>
                  <p>{test?.[0].country.name}</p>
                  <p>{test?.[0].city.name}</p>
                  <p>{cit.dates.start.localDate}</p>
              </article>
       
        )}
    </>
    )
}
