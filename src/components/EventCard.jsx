import { Link } from "react-router-dom";
import "../assets/styles/eventCard.scss"

export default function EventCard({ event, linkToDetails = true }) {
  const id = event.id;
  let date;
  let venue;

  if(event.type === "event") {
    date = event.dates?.start?.localDate;
    venue = event._embedded?.venues?.[0];
  }
  if(event.type == "venue") {
    venue = event;
  }

  const loadEventImg = (value) => {
    const allowedExstensions = ["jpg", "jpeg", "png", "webp"];

    if(!("images" in value)) 
      return "https://placehold.co/600x400?text=Billettyst"

    const foundImg = value.images.find((img) => img.ratio === "16_9" && (img.width < 800 && img.width > 300))
      
    if(!foundImg || !("url" in foundImg))
      return "https://placehold.co/600x400?text=Billettyst"
      
    const imgSplit = foundImg.url.split(".");

    if(!allowedExstensions.includes(imgSplit.pop())) {
      return "https://placehold.co/600x400?text=Billettyst"
    }
    return foundImg.url;
  }

  const formatDateNO = (value) => {
    return value.split("-").reverse().join(".");
  }

  const content = (
    <>
      <img src= {loadEventImg(event)} alt={`${event.name} banner`}/>
      <span className="favouriteButton"><img src="../src/assets/gfx/heartOutline.svg" alt=""/></span>
      
      <section className="evenCardInner">
        <h3>{event.name}</h3>

        {venue && <p className="eventDetail">
          <img src="../src/assets/gfx/markerOutline.svg" alt="" />
          {event.type === "event" ? <span className="bold">{venue?.name}, </span>: ""}
          <span>{venue?.city.name}</span>
          </p>
        }

        {date && <p className="eventDetail">
          <img src="../src/assets/gfx/calendarOutline.svg" alt="" />
          <span>{formatDateNO(date)}</span>
          </p>
        }

        {linkToDetails && <span className="eventBtn">Les mer</span>}
      </section>
    </>  
    );

  return linkToDetails ? (
    <Link to={`/event/${id}`} className="eventCard">
      {content}
    </Link>
  ) : (
    <article className="eventCard">
      {content}  
    </article>
  );
}