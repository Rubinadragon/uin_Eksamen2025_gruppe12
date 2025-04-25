import { useState } from 'react'
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard"
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import CategoryPage from './components/CategoryPage'
import EventPage from './components/EventPage'

function App() {

  return (
    <>
     <Layout>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="event/:id" element={<EventPage/>}/>
          <Route path="category/:slug" element={<CategoryPage/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
        </Routes>
     </Layout>
    </>
  )
}

export default App
