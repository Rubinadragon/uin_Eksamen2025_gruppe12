import { useParams }   from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSuggestions } from "../fetchers/fetchTicketmaster";
import Filter from "./Filter";
import "../assets/styles/categoryPage.scss";
import EventCard from "./EventCard";

export default function CategoryPage({ selectedClasses, wishlist, setWishlist }) {
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

    const currentCat = selectedClasses?.find(cls => cls.id === slug).name;

    const setBgImg = (value) => {
      if("Sport" === value)
        return "sportBg.jpg"
      else if("Kultur & Teater" === value)
        return "theatreBg.jpg"
      else
        return "musicBg.jpg"
    }

    return (
      <>
        <section className="categoryHeader">
          <h1>Kategori: {currentCat}</h1>

          <Filter setLoadingResults={setLoadingResults} setFilterQuery={setFilterQuery}/>
          <img src={`../src/assets/img/${setBgImg(currentCat)}`} alt="" />
          <div className="bgDarkOverlay"></div>
        </section>

        <section className="categorySection">
          <h2>Attractions</h2>
          {
            !loadingResults && "events" in categorySuggestions ? // https://stackoverflow.com/questions/68091417/display-no-results-component-when-there-are-no-results
            categorySuggestions.events.reduce((acc, obj) => {  // https://www.geeksforgeeks.org/how-to-get-distinct-values-from-an-array-of-objects-in-javascript/
              if(!acc.some(o => o._embedded?.attractions?.[0].id === obj._embedded?.attractions?.[0].id)) {
                acc.push(obj)
              }
              return acc
              }, []).map((attraction) => (
                <EventCard key={`categoryAttraction_${attraction.id}`} event={attraction._embedded.attractions?.[0]} wishlist={wishlist} setWishlist={setWishlist}/>
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
                <EventCard key={`categoryEvent_${event.id}`} event={event} wishlist={wishlist} setWishlist={setWishlist}/>
              ))
              : <p>Ingen arrangementer funnet</p>
          }
        </section>

        <section className="categorySection">
          <h2>Venues</h2>
          {
            !loadingResults && "venues" in categorySuggestions ?
              categorySuggestions.venues?.map((venue) => (
                <EventCard key={`categoryVenue${venue.id}`} event={venue} wishlist={wishlist} setWishlist={setWishlist}/>
              ))
              :
              <p>Ingen lokasjoner funnet</p>
          }
        </section>
        </>
    );
  }
