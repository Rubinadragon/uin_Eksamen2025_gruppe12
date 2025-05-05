import { useParams }   from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSuggestions } from "../fetchers/fetchTicketmasterCategories";
import "../assets/styles/categoryPage.scss";
import {countries} from "../assets/js/countryCodes";
import { cities } from "../assets/js/citiesLocation";

export default function CategoryPage({ selectedClasses }) {
    const { slug } = useParams();

    const [categorySuggestions, setCategorySuggestions] = useState([]);
    const [loadingResults, setLoadingResults] = useState(true);
    const [filterCountry, setFilterCountry] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoadingResults(true)
      await getSuggestionsFilter(e.target.filterCountries.value, slug)
    }

    const getSuggestionsFilter = async(countryCode, segmentId) => {
      let apidata = null;
      await fetch(`https://app.ticketmaster.com/discovery/v2/suggest?apikey=sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX&locale=*&countryCode=${countryCode}&segmentId=${segmentId}`)
      .then((response) => response.json())
      .then((data) => (apidata = data._embedded))

      setCategorySuggestions(apidata)
      setLoadingResults(false)
    }

    const getSuggestionsByCategory = async(keyword) => {
      try {
        const data = await fetchSuggestions(keyword);
        setCategorySuggestions(data);
        setLoadingResults(false);
      }
      catch(error) {
        console.log(error);
      }
    }

    const handleChange = (value) => {
      setFilterCountry(value)
    }

    useEffect(() => {
      let active = true;
      /*fetchEventsByCategory(slug)
        .then(data => active && setEvents(data))
        .finally(() => active && setLoading(false));
      return () => { active = false }; */
      getSuggestionsByCategory(slug);
    }, [slug]);
    
    const categoryName = selectedClasses.find(cls => cls.segment.id === slug)?.segment.name;
    console.log(filterCountry)
    
    return (
      <>
        <h1>Kategori: {categoryName}</h1>
        <section>
          <h2>Filter</h2>
          <form onSubmit={handleSubmit}>
            <select name="countries" id="filterCountries" defaultValue="no" onChange={(e)=> handleChange(e.target.value)}>
            {
              countries.map((country) => (
                <option key={`select_${country.code}`}value={country.code}>{country.name}</option>
              ))
            }
            </select>
            <select name="cities" id="filterCities" defaultValue="alle byer...">
              <option value="any">velg by..</option>
              {
                cities.filter((city) => city.code === filterCountry).map((city) =>(
                  <option key={`city_${city.name}`} value={city.lat + "," + city.long}>{city.name}</option>
                ))
              }
            </select>
            <button type="submit">Filtrer søk</button>
          </form>
        </section>

        <section>
          <h2>Attractions</h2>
          {
            !loadingResults && "events" in categorySuggestions ?
            categorySuggestions.events.reduce((acc, obj) => {
              if(!acc.some(o => o._embedded?.attractions?.[0].id === obj._embedded?.attractions?.[0].id)) {
                acc.push(obj)
              }
              return acc
              }, []).map((attraction) => (
                <article key={`categoryAttraction_${attraction.id}`}>
                <img src={
                  "images" in attraction ? attraction.images.find((img) => img.ratio === "16_9" && (img.width < 800 && img.width > 300)).url : "test.jpg"
                } alt="" />
                <h3>{attraction.name}</h3>
              </article>
            ))
            :
            <p>Ingen attraksjoner funnet</p>
          }
        </section>
        <section>
          <h2>Events</h2>
          {
            !loadingResults && "events" in categorySuggestions ?
              categorySuggestions.events?.map((event) => (
                <article key={`categoryEvent_${event.id}`}>
                <img src={
                 "images" in event ? event.images.find((element) => element.ratio === "16_9" && (element.width < 800 && element.width > 300)).url : "test.jpg"
                } alt="" />
                <h3>{event.name}</h3>
              </article>
              ))
              : <p>Ingen arrangementer funnet</p>
          }
        </section>
        <section>
          <h2>Venues</h2>
          {
            !loadingResults && "venues" in categorySuggestions ?
              categorySuggestions.venues?.map((venue) => (
                <article key={`categoryVenue${venue.id}`}>
                {
                  <img src={
                  "images" in venue ? venue.images.find((element) => element.ratio === "16_9").url : "test.jpg"
                } alt="" />
                }
                <h3>{venue.name}</h3>
              </article>
              ))
              :
              <p>Ingen lokasjoner funnet</p>
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
