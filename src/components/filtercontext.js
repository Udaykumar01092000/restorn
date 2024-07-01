import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState([]);
  const [userSearch, setUserSearch] = useState('');

  // Wrap applyFilters with useCallback
  const applyFilters = useCallback((restaurants) => {
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
  }, [filters, userSearch]); // Dependency array includes filters and userSearch

  useEffect(() => {
    // Call applyFilters in the useEffect callback
    const handleApplyFilters = () => {
      applyFilters(); // Corrected: Removed unnecessary function call
    };

    // Call handleApplyFilters whenever filters or userSearch changes
    handleApplyFilters();
  }, [filters, userSearch, applyFilters]); // Dependency array includes applyFilters, filters, and userSearch

  return (
    <FilterContext.Provider value={{ filters, setFilters, applyFilters, userSearch, setUserSearch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  return useContext(FilterContext);
};
