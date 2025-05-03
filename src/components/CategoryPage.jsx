import { useParams }   from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchEventsByCategory, fetchSuggestions } from "../fetchers/fetchTicketmaster";
import "../assets/styles/categoryPage.scss";

export default function CategoryPage({ selectedClasses }) {
    const { slug } = useParams();

    const [categorySuggestions, setCategorySuggestions] = useState([]);

    const [loading, setLoading] = useState(true);
  
    //const categoryName = selectedClasses.find(cls => cls.segment.id === slug)?.segment.name;
  

    const getSuggestionsByCategory = async(keyword) => {
      try {
        const data = await fetchSuggestions(keyword);
        setCategorySuggestions(data);
      }
      catch(error) {
        console.log(error);
      }
    }

    useEffect(() => {
      let active = true;
      /*fetchEventsByCategory(slug)
        .then(data => active && setEvents(data))
        .finally(() => active && setLoading(false));
      return () => { active = false }; */
      getSuggestionsByCategory(slug);
    }, [slug]);
    
    console.log(categorySuggestions)
    //console.log(selectedClasses)
    return (
      <>
        <h1>Category: {slug}</h1>

        <section>
          <h2>Attractions</h2>
          {
            categorySuggestions.attractions?.map((attraction) => (
              <article key={`categoryAttraction_${attraction.id}`}>
                <img src={
                  attraction.images.find((element) => element.ratio === "16_9" && (element.width < 800 && element.width > 300)).url
                } alt="" />
                <h3>{attraction.name}</h3>
              </article> 
            ))
          }
        </section>
        <section>
          <h2>Events</h2>
          {
            categorySuggestions.events?.map((event) => (
              <article key={`categoryEvent_${event.id}`}>
              <img src={
                event.images.find((element) => element.ratio === "16_9" && (element.width < 800 && element.width > 300)).url
              } alt="" />
              <h3>{event.name}</h3>
            </article>
            ))
          }
        </section>
        <section>
          <h2>Venues</h2>
          {
            categorySuggestions.venues?.map((venue) => (
              <article key={`categoryVenue${venue.id}`}>
              {
                'images' in venue ? 
                <img src={
                venue.images.find((element) => element.ratio === "16_9").url 
              } alt="" />
              : ""
              }
              <h3>{venue.name}</h3>
            </article>
            ))
          }
        </section>
  
        {/*<div className="eventList">
          {events.map(evt => (
            <div key={evt.id}>
              <h3>{evt.name}</h3>
              <p>{evt.dates?.start?.localDate}</p>
              <p>{evt._embedded?.venues?.[0]?.name}</p>
            </div>
          ))}
        </div>
        */}
        </>
    );
  }
