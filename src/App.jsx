import { useEffect, useState } from 'react'
import "./assets/styles/styles.scss"
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard"
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import CategoryPage from './components/CategoryPage'
import EventPage from './components/EventPage'


function App() {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  
  const apiKey = "sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX";
  const classification = "KZFzniwnSyZfZ7v7nJ,KZFzniwnSyZfZ7v7nE,KZFzniwnSyZfZ7v7na&locale"
  const locale = "no"


  const getSelectedClasses = async () => {
    await fetch(`https://app.ticketmaster.com/discovery/v2/classifications?apikey=${apiKey}&id=KZFzniwnSyZfZ7v7nJ,KZFzniwnSyZfZ7v7nE,KZFzniwnSyZfZ7v7na&locale=no`)
    .then((response) => response.json())
    .then((data) => setSelectedClasses(data._embedded.classifications))
    
  }

const handleWishlist = () => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

useEffect(() => {
    const localUser = localStorage.getItem("loggedIn");
    if (localUser) {
      setCurrentUser(JSON.parse(localUser));
      setIsLoggedIn(true);
    }
  }, []);

    
  useEffect(()=>{
    getSelectedClasses();
  },[])

  useEffect(()=>{
    handleWishlist();
  },[wishlist])

  return (
    <>
     <Layout 
      selectedClasses={selectedClasses} 
      setSelectedClasses={setSelectedClasses}
      isLoggedIn={isLoggedIn} 
      currentUser={currentUser}
      logout={() => {
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("userWishlist");
          localStorage.removeItem("userPurchased");
          localStorage.removeItem("wishlist");
          setIsLoggedIn(false);
          setCurrentUser(null);
      }}
      >
        <Routes>
          <Route path='/' element={<Home wishlist={wishlist} setWishlist={setWishlist}/>}/>
          <Route path="event/:id" element={<EventPage/>}/>
          <Route path="category/:slug" element={<CategoryPage selectedClasses={selectedClasses} wishlist={wishlist} setWishlist={setWishlist}/>} />
          <Route path="dashboard" element={<Dashboard setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />}/>
        </Routes>
     </Layout>
    </>
  )
}

export default App
