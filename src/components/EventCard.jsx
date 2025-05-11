import { Link } from "react-router-dom";
import "../assets/styles/eventCard.scss"

export default function EventCard({ event, wishlist, setWishlist, linkToDetails = true }) {
  let date;
  let venue;
  const id = event.id;

  if(event?.type === "event") {
    date = event.dates?.start?.localDate;
    venue = event._embedded?.venues?.[0];
  }
  if(event?.type == "venue") {
    venue = event;
  }

  const loadEventImg = (value) => {
    const allowedExstensions = ["jpg", "jpeg", "png", "webp"];

    if(!("images" in value)) 
      return "https://placehold.co/600x400?text=Billetltyst"

    const foundImg = value.images.find((img) => img.ratio === "16_9" && (img.width < 800 && img.width > 300))
      
    if(!foundImg || !("url" in foundImg))
      return "https://placehold.co/600x400?text=Billetltyst"
      
    const imgSplit = foundImg.url.split(".");

    if(!allowedExstensions.includes(imgSplit.pop())) {
      return "https://placehold.co/600x400?text=Billetltyst"
    }
    return foundImg.url;
  }

  const formatDateNO = (value) => {
    return value.split("-").reverse().join(".");
  }

  const isWishlisted = (value) => {
    return wishlist.some((e) => e.id === value)
  }

  const handleOnClick = (eventId, eventType) => {
    if(wishlist.some((e) => e.id === eventId)) {
      setWishlist(wishlist.filter((e) => e.id !== eventId));
    }
    else {
      setWishlist([...wishlist, {id: eventId, type: eventType}]);
    }  
  }

  const content = (
    <>
      <img src= {loadEventImg(event)} alt={`${event.name} banner`}/>
      {wishlist && <span className="favouriteButton" onClick={() => handleOnClick(id, event.type)}><img src={`../src/assets/gfx/${isWishlisted(id) ? "heartSolid" : "heartOutline"}.svg`} alt=""/></span> }
      
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

        {linkToDetails && <Link to={`/event/${id}`} className="eventBtn"><span>Les mer</span></Link>}
      </section>
    </>  
    );
    
  return (
    <article className="eventCard">
      {content }
    </article> 
  )
}