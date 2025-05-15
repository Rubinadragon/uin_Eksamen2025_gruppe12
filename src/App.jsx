import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import "./assets/styles/styles.scss"
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard"
import Home from './components/Home'
import CategoryPage from './components/CategoryPage'
import EventPage from './components/EventPage'
import CityEventCard from './components/CityEventCard'
import { fetchSelectedClassifications, fetchAttractionsById } from './fetchers/fetchTicketmaster'
import SanityEventDetails from './components/SanityEventDetails'


function App() {
  const [selectedClasses, setSelectedClasses] = useState(JSON.parse(sessionStorage.getItem("classifications")) || []);
  const [selectedFestivals, setSelectedFestivals] = useState([]);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);

  const CLASSIFICATIONS = "KZFzniwnSyZfZ7v7nJ,KZFzniwnSyZfZ7v7nE,KZFzniwnSyZfZ7v7na";

  const getSelectedClasses = async (classIds) => {
    try {
      const data = (await fetchSelectedClassifications(classIds)).map((e) => {
        return {id: e.segment.id, name: e.segment.name}
      });

      setSelectedClasses(data);
    }
    catch(error) {
      console.log(error);
    }
  }

  const getSelectedFestivals = async (festivalIds) => {
      try {
          const response = await fetchAttractionsById(festivalIds);
          setSelectedFestivals(response);
      }
      catch(error) {
          console.error("Cannot fetch festivals!:", error)
      }
  };

  // Caching categories in session storage for limiting amount of fetch requests to REST API.
  const cacheClassifications = (e) => { 
    sessionStorage.setItem("classifications", JSON.stringify(e))
  }

  const handleWishlist = () => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }


  useEffect(()=>{
    if(selectedFestivals.length < 1)
      getSelectedFestivals("K8vZ917oWOV,K8vZ917K7fV,K8vZ917bJC7,K8vZ917_YJf");

    if(selectedClasses.length < 1)
      getSelectedClasses(CLASSIFICATIONS);
      cacheClassifications(selectedClasses);

  },[selectedClasses]);

  useEffect(()=>{
    handleWishlist();
  },[wishlist]);

  //console.log(wishlist)

  return (
    <>
     <Layout selectedClasses={selectedClasses}>
        <Routes>
          <Route path='/' element={<Home selectedFestivals={selectedFestivals} wishlist={wishlist} setWishlist={setWishlist}/>}/>
          <Route path="event/:id" element={<EventPage selectedFestivals={selectedFestivals}/>}/>
          <Route path="category/:slug" element={<CategoryPage selectedClasses={selectedClasses} wishlist={wishlist} setWishlist={setWishlist}/>} />
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="tencity/:city_name" element={<CityEventCard/>}/>
          <Route path="sanity-event/:apiId" element={<SanityEventDetails/>}/>
        </Routes>
     </Layout>
    </>
  )
}

export default App
