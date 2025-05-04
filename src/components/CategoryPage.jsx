import { useParams }   from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchEventsByCategory, fetchSuggestions } from "../fetchers/fetchTicketmaster";
import "../assets/styles/categoryPage.scss";

export default function CategoryPage({ selectedClasses }) {
    const { slug } = useParams();

    const [categorySuggestions, setCategorySuggestions] = useState([]);
    const [attractions, setAttractions] = useState([]);

    const [loading, setLoading] = useState(true);
  
    //const categoryName = selectedClasses.find(cls => cls.segment.id === slug)?.segment.name;

    const handleSubmit = async (e) => {
      e.preventDefault();
      await getSuggestionsFilter(e.target.filterCountries.value, slug)
    }

    const getSuggestionsFilter = async(countryCode, segmentId) => {
      let apidata = null;
      let eventData = null;
      await fetch(`https://app.ticketmaster.com/discovery/v2/suggest?apikey=sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX&locale=*&countryCode=${countryCode}&segmentId=${segmentId}`)
      .then((response) => response.json())
      .then((data) => (apidata = data._embedded, eventData = data._embedded.events))

      setCategorySuggestions(apidata)
      getAttractionsFromEvents(eventData)
    }

    const getAttractionsFromEvents = (values) => {
      let allAttractions = values.map((value) => value._embedded.attractions[0])
      
      let uniqie = allAttractions.reduce((acc, obj) => {
        if(!acc.some(o => o.id === obj.id)) {
          acc.push(obj);
        }
        return acc;
      }, [])
      setAttractions(uniqie)

    }

    const getSuggestionsByCategory = async(keyword) => {
      try {
        const data = await fetchSuggestions(keyword);
        setCategorySuggestions(data);
        setAttractions(data.attractions)
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
    
    //console.log(categorySuggestions)
    //console.log(selectedClasses)
    return (
      <>
        <h1>Category: {slug}</h1>
        <section>
          <h2>Filter</h2>
          <form onSubmit={handleSubmit}>
            <select name="countries" id="filterCountries">
              <option value="">Select</option>
              <option value="no">Norge</option>
              <option value="se">Sverige</option>
              <option value="de">Danmark</option>
              <option value="fi">Finland</option>
            </select>
            <button type="submit">Filtrer søk</button>
          </form>
        </section>

        <section>
          <h2>Attractions</h2>
          {
            categorySuggestions.events?.reduce((acc, obj) => {
              if(!acc.some(o => o._embedded.attractions[0].id === obj._embedded.attractions[0].id)) {
                acc.push(obj)
              }
              return acc
              }, []).map((attraction) => (
                <article key={`categoryAttraction_${attraction.id}`}>
                <img src={
                  attraction.images.find((img) => img.ratio === "16_9" && (img.width < 800 && img.width > 300)).url
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
