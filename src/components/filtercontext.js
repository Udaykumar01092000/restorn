// FilterContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState([]);
  const [userSearch, setUserSearch] = useState('');

  const applyFilters = (restaurants) => {
    let filtered = restaurants ? [...restaurants] : [];
  
    if (filters.includes('fastDelivery')) {
      filtered = filtered.sort((a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime);
    }
  
    if (filters.includes('ratinghightolow')) {
      filtered = filtered.sort((a, b) => b.info.avgRating - a.info.avgRating);
    }
  
    if (filters.includes('ratinglowtohigh')) {
      filtered = filtered.sort((a, b) => a.info.avgRating - b.info.avgRating);
    }
  
    if (userSearch) {
      filtered = filtered.filter((restaurant) =>
        restaurant.info.name.toLowerCase().includes(userSearch.toLowerCase())
      );
    }
    return filtered;
  };
  

  useEffect(() => {
    // Reapply filters whenever filters or userSearch changes
    applyFilters();
  }, [filters, userSearch]);

  return (
    <FilterContext.Provider value={{ filters, setFilters, applyFilters, userSearch, setUserSearch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  return useContext(FilterContext);
};
