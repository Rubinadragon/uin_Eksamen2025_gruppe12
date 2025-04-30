import { useParams }   from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchEventsByCategory } from "../fetchers/fetchTicketmaster";

export default function CategoryPage({ selectedClasses }) {
    const { slug } = useParams(); 
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const categoryName = selectedClasses.find(cls => cls.segment.id === slug)?.segment.name || slug;
  
    useEffect(() => {
      let active = true;
      fetchEventsByCategory(slug)
        .then(data => active && setEvents(data))
        .finally(() => active && setLoading(false));
      return () => { active = false };
    }, [slug]);
  
    return (
      <section>
        <h1>{categoryName}</h1>
  
        {loading && <p>Laster inn …</p>}
        {!loading && !events.length && <p>Ingen arrangementer funnet.</p>}
  
        <div className="eventList">
          {events.map(evt => (
            <div key={evt.id}>
              <h3>{evt.name}</h3>
              <p>{evt.dates?.start?.localDate}</p>
              <p>{evt._embedded?.venues?.[0]?.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }