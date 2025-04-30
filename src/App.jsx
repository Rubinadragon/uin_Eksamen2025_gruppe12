import { useEffect, useState } from 'react'
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard"
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import CategoryPage from './components/CategoryPage'
import EventPage from './components/EventPage'

function App() {
  const [selectedClasses, setSelectedClasses] = useState([])

  const apiKey = "sV6gYIGVOW7z9DLVElsxVgGUyC5Ox3EX";

  const getSelectedClasses = async () => {
    await fetch(`https://app.ticketmaster.com/discovery/v2/classifications?apikey=${apiKey}&id=KZFzniwnSyZfZ7v7nJ,KZFzniwnSyZfZ7v7nE,KZFzniwnSyZfZ7v7na&locale=no`)
    .then((response) => response.json())
    .then((data) => setSelectedClasses(data._embedded.classifications))
    
  }

  useEffect(()=>{
    getSelectedClasses()
  },[])

  console.log(selectedClasses)

  console.log(setSelectedClasses)
  return (
    <>
     <Layout selectedClasses={selectedClasses} setSelectedClasses={setSelectedClasses}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="event/:id" element={<EventPage/>}/>
          <Route path="category/:slug" element={<CategoryPage selectedClasses={selectedClasses} />} />
          <Route path="dashboard" element={<Dashboard/>}/>
        </Routes>
     </Layout>
    </>
  )
}

export default App
