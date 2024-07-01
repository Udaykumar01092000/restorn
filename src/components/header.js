import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/header.css';
import { useFilters } from '../../src/components/filtercontext';
import { useSelector } from 'react-redux';

const Header = ({ setUserSearch, setShowModal }) => {
  const { setFilters } = useFilters();

  const handleFilterClick = (filter) => {
    setFilters(prevFilters => [...prevFilters, filter]);
  };

  const handleToggleClick = () => {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    } else {
      navbarCollapse.classList.add('show');
    }
  };

  useEffect(() => {
    const navbarToggler = document.getElementById('navbar-toggler');
    navbarToggler.addEventListener('click', handleToggleClick);

    return () => {
      navbarToggler.removeEventListener('click', handleToggleClick);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // You can add more search logic here if needed
  };

  let cartItems =  useSelector((state )=>
     state.cartItems
  )

  console.log(cartItems)
  return (
    <nav className={`navbar navbar-expand-lg ${styles['bg-body-tertiary']}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h1 className={`text-primary m-0`} id="headtitle">
            <i className="fa fa-utensils me-3"></i>Restoran
          </h1>
        </Link>
        <button id="navbar-toggler" className="navbar-toggler" type="button" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center w-100">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/searchDishes">Search Dishes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/searchRestaurants">Search Restaurants</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => setShowModal(true)} href="#">Search Locations</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
              </svg>{" "}Cart - {cartItems.length}</Link>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              onChange={(e) => setUserSearch(e.target.value)}
              type="search"
              placeholder="Search Restaurants By Name"
              aria-label="Search"
            />
            <button className="btn btn-outline-success m-2" id="searchbtn" type="submit">
              Search
            </button>
          </form>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Filters
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" onClick={() => handleFilterClick('fastDelivery')} href="#">Fast Delivery</a>
              </li>
              <li>
                <a className="dropdown-item" onClick={() => handleFilterClick('ratinghightolow')} href="#">Rating: High to Low</a>
              </li>
              <li>
                <a className="dropdown-item" onClick={() => handleFilterClick('ratinglowtohigh')} href="#">Rating: Low to High</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
