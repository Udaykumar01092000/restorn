import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../src/components/header';
import { FilterProvider } from './components/filtercontext';
import Home from '../src/components/home';
import Restaurantspec from './components/restaurantspec';
import SearchDishes from './components/searchdishes';
import SearchRestaurants from './components/searchRestaurants';
import Cart from './components/Cart';
import PrintBill from './components/printbill';

const App = () => {
  const [userSearch, setUserSearch] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal

  return (
    <FilterProvider>
      <Router>
        <Header setUserSearch={setUserSearch} setShowModal={setShowModal} />
        <Routes>
          <Route path="/" element={<Home userSearch={userSearch} setUserSearch={setUserSearch} showModal={showModal} setShowModal={setShowModal} />} />
          <Route path = "/restaurant/:restaurantId/:restaurantName" element = {<Restaurantspec/>}/>
          <Route path = "/searchDishes" element = {<SearchDishes/>}/>  
          <Route path = "/searchRestaurants" element = {<SearchRestaurants/>}/>  
          <Route path = "/cart" element = {<Cart/>}/>
          <Route path="/print-bill" element={<PrintBill />} />
        </Routes>
      </Router>
    </FilterProvider>
  );
}

export default App;
