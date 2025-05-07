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

    const setBgImg = (value) => {
      if("Sport" === currentCategory?.name)
        return "sportBg.jpg"
      else if("Kultur & Teater" === currentCategory?.name)
        return "theatreBg.jpg"
      else
        return "musicBg.jpg"
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

    return (
      <>
        <section className="categoryHeader">
          <h1>Kategori: {currentCategory?.name}</h1>

          <Filter setLoadingResults={setLoadingResults} setFilterQuery={setFilterQuery}/>
          <img src={`../src/assets/img/${setBgImg(slug)}`} alt="" />
          <div className="bgDarkOverlay"></div>
        </section>

        <section className="categorySection">
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

                <img src={loadEventImg(attraction)} alt={`${attraction.name} banner`} />
                <h3>{attraction.name}</h3>
              </article>
            ))
            :
            <p>Ingen attraksjoner funnet</p>
          }
        </section>

        <section className="categorySection">
          <h2>Events</h2>
          {
            !loadingResults && "events" in categorySuggestions ?
              categorySuggestions.events?.map((event) => (
                <article key={`categoryEvent_${event.id}`}>
                <img src= {loadEventImg(event)} alt={`${event.name} banner`}/>
                <h3>{event.name}</h3>
              </article>
              ))
              : <p>Ingen arrangementer funnet</p>
          }
        </section>

        <section className="categorySection">
          <h2>Venues</h2>
          {
            !loadingResults && "venues" in categorySuggestions ?
              categorySuggestions.venues?.map((venue) => (
                <article key={`categoryVenue${venue.id}`}>
                {
                  <img src= {loadEventImg(venue)} alt={`${venue.name} banner`}/>
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
