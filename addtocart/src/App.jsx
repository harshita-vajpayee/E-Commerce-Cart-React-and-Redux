import { useState } from 'react'
import Header from './Components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import Cards from './Components/Cards';
import CardsDetails from './Components/CardsDetails';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route exact path='/' element={<Cards />} />
        <Route exact path='/cart/:id' element={<CardsDetails />} />
      </Routes>
    </>
  )
}

export default App
