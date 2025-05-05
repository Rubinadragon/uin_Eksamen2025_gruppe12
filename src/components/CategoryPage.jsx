import { useParams }   from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSuggestionsFilter } from "../fetchers/fetchTicketmaster";
import "../assets/styles/categoryPage.scss";
import {countries} from "../assets/js/countryCodes";
import { cities } from "../assets/js/citiesLocation";

export default function CategoryPage({ selectedClasses }) {
    const { slug } = useParams();

    const [categorySuggestions, setCategorySuggestions] = useState([]);
    const [loadingResults, setLoadingResults] = useState(true);
    const [filterCountry, setFilterCountry] = useState("");

    useEffect(() => {
      getSuggestionsFilter(slug);
    }, [slug]);

    const getSuggestionsFilter = async(segmentId, e = {}) => {
      let buildFilter = "";
      if(segmentId.length)
        buildFilter += "&segmentId=" + segmentId;
      if("target" in e && e.target.filterCountries.value.length)
        buildFilter += "&countryCode=" + e.target.filterCountries.value;
      if("target" in e && e.target.filterCities.value.length)
        buildFilter += "&geoPoint=" + e.target.filterCities.value;
      if("target" in e && e.target.filterDates.value.length)
        buildFilter += "&localStartEndDateTime=" + e.target.filterDates.value + "T00:00:00";
      
      console.log(buildFilter)
      try {
        const data = await fetchSuggestionsFilter(buildFilter);
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoadingResults(true)
      
      await getSuggestionsFilter(slug, e)
    }
    
    const categoryName = selectedClasses.find(cls => cls.segment.id === slug)?.segment.name;
    
    return (
      <>
        <h1>Kategori: {categoryName}</h1>
        <section>
          <h2>Filter</h2>
          <form onSubmit={handleSubmit}>
            <input type="date" id="filterDates" name="dates" />
            <select name="countries" id="filterCountries" onChange={(e)=> handleChange(e.target.value)}>
              <option value="">Velg land</option>
            {
              countries.map((country) => (
                <option key={`select_${country.code}`}value={country.code}>{country.name}</option>
              ))
            }
            </select>
            <select name="cities" id="filterCities">
              <option value="">velg by</option>
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
