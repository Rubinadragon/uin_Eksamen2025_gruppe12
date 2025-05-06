import { useParams }   from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSuggestions } from "../fetchers/fetchTicketmaster";
import Filter from "./Filter";
import "../assets/styles/categoryPage.scss";

export default function CategoryPage({ selectedClasses }) {
    const { slug } = useParams();

    const [categorySuggestions, setCategorySuggestions] = useState([]);
    const [loadingResults, setLoadingResults] = useState(true);
    const [filterQuery, setFilterQuery] = useState([]);

    useEffect(() => {
      getSuggestions(slug, filterQuery);
    }, [slug, filterQuery]);

    const getSuggestions = async(segmentId, e) => {
      let query = `&segmentId=${segmentId}${e}`;
      
      try {
        const data = await fetchSuggestions(query);

        data ? setCategorySuggestions(data) : setCategorySuggestions({})
        setLoadingResults(false);
      }
      catch(error) {
        console.log(error);
      }
    }
    
    const currentCategory = selectedClasses.find(cls => cls.segment.id === slug)?.segment;

    return (
      <>
        <h1>Kategori: {currentCategory?.name}</h1>

        <Filter setLoadingResults={setLoadingResults} setFilterQuery={setFilterQuery}/>

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
        </>
    );
  }
