import { useEffect, useState } from "react";

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

//Map testing 
console.log("Array:",city)

 const test = city?.map(testy => testy._embedded)
 console.log("test",test)


 const test2 = test?.map(test2 => test2.locale)
 console.log("test2", test2)

useEffect(()=> {
    fetchTenEventsByCity()
}, [city_name])

function Oslo() {
    city_name = "Oslo"
    console.log("city:",city_name)
}
function Stockholm() {
    city_name = "Stockholm"
    console.log("city:",city_name)
}
function Berlin() {
    city_name = "Berlin"
    console.log("city:",city_name)
}
function London() {
    city_name = "London"
    console.log("city:",city_name)
}

    return(
    <>
        <ul>
            <li><button onClick={Oslo}>Oslo</button></li>
            <li><button onClick={Stockholm}>Stockholm</button></li>
            <li><button onClick={Berlin}>Berlin</button></li>
            <li><button onClick={London}>London</button></li>
        </ul>

        <h3>Hva skjer i {city_name}</h3>
        {city?.map(cit => 
                  <article key={cit.id}>
                  <h3>{cit.name}</h3>
                  <img/>
                  <p></p>
                  <p>{cit.dates.start.localDate}</p>
              </article>
        )}
    </>
    )
}
