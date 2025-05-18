import { formatDateNO } from "../assets/js/utils"
import "../assets/styles/eventCard.scss"


export default function CityEventCard({city}){
    return(
    <>
      <article key={city.id} className="eventCard"> 
          <img src={
            city.images.find((img) => img.ratio === "16_9" && (img.width < 800 && img.width > 300)).url}
            alt={city.name}/>
            <section className="evenCardInner">
              <h3>{city.name}</h3>
              <p>{city._embedded.venues[0].country.name}</p>
              <p>{city._embedded.venues[0].city.name}</p>
              <p className="eventDetail">{formatDateNO(city.dates.start.localDate)}</p>
            </section>

      </article>
    </>
    )
}
