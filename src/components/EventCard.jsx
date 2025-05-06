import { Link } from "react-router-dom";
import "../assets/styles/eventCard.scss"

export default function EventCard({ event, linkToDetails = true }) {
  const name = event.name;
  const date = event.dates?.start?.localDate;
  const venue = event._embedded?.venues?.[0]?.name;
  const id = event.id;
  //const image = event.

  const content = (
    <article className="eventKort">
      <img src={"images" in event ? event.images.find((img) => img.ratio === "16_9" && (img.width < 800 && img.width > 300)).url : "test.jpg"}/>
      <h3>{name}</h3>
      {date && <p>{date}</p>}
      {venue && <p>{venue}</p>}
      {linkToDetails && <span>Les mer</span>}
    </article>
  );

  return linkToDetails ? (
    <Link to={`/event/${id}`} className="eventLink">
      {content}
    </Link>
  ) : (
    content
  );
}
