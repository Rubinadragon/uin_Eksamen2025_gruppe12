import { useEffect, useState } from 'react'
import "./assets/styles/styles.scss"
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard"
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import CategoryPage from './components/CategoryPage'
import EventPage from './components/EventPage'
import SanityEventDetails from './components/SanityEventDetails'

function App() {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);
  
  //const apiKey = "sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX";
  const apiKey = "JF1iWmRvlI6x3AbIps1uDqKtG9njUcTx"
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

  useEffect(()=>{
    getSelectedClasses();
  },[])

  useEffect(()=>{
    handleWishlist();
  },[wishlist])

  //console.log(wishlist)

  return (
    <>
     <Layout selectedClasses={selectedClasses} setSelectedClasses={setSelectedClasses}>
        <Routes>
          <Route path='/' element={<Home wishlist={wishlist} setWishlist={setWishlist}/>}/>
          <Route path="event/:id" element={<EventPage/>}/>
          <Route path="category/:slug" element={<CategoryPage selectedClasses={selectedClasses} wishlist={wishlist} setWishlist={setWishlist}/>} />
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="sanity-event/:apiId" element={<SanityEventDetails/>}/>
        </Routes>
     </Layout>
    </>
  )
}

export default App
