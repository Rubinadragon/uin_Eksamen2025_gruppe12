import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import "./assets/styles/styles.scss"
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard"
import Home from './components/Home'
import CategoryPage from './components/CategoryPage'
import EventPage from './components/EventPage'
import { fetchSelectedClassifications, fetchAttractionsById } from './fetchers/fetchTicketmaster'
import { fetchUserName } from './fetchers/brukerServices'
import SanityEventDetails from './components/SanityEventDetails'

function App() {
  const [selectedClasses, setSelectedClasses] = useState(JSON.parse(sessionStorage.getItem("classifications")) || []);
  const [selectedFestivals, setSelectedFestivals] = useState([]);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
      const getUser = async (username) => {
      try {
        const data  = await fetchUserName(username);
        setIsLoggedIn(true);
        setCurrentUser(data);
      }
      catch(error) {
        console.log("Feil med henting av innlogget bruker.");
      }
    }
      
    const localUser = localStorage.getItem("loggedIn");
    if (localUser) {
      getUser(localUser);
    }

  }, []);

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

  const handleWishlist = () => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }

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
  
  return (
    <>
     <Layout 
      selectedClasses={selectedClasses} 
      setSelectedClasses={setSelectedClasses}
      isLoggedIn={isLoggedIn} 
      currentUser={currentUser}
      logout={() => {
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("wishlist");
          setIsLoggedIn(false);
          setCurrentUser(null);
      }}
      >
        <Routes>
          <Route path='/' element={<Home selectedFestivals={selectedFestivals} wishlist={wishlist} setWishlist={setWishlist}/>}/>
          <Route path="event/:id" element={<EventPage selectedFestivals={selectedFestivals}/>}/>
          <Route path="category/:slug" element={<CategoryPage selectedClasses={selectedClasses} wishlist={wishlist} setWishlist={setWishlist}/>} />
Home-10-arrangementer-storby
          <Route path="dashboard" element={<Dashboard setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />}/>
          <Route path="sanity-event/:apiId" element={<SanityEventDetails/>}/>
 Develop
        </Routes>
     </Layout>
    </>
  )
}

export default App
