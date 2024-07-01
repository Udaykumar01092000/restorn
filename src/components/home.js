import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useFilters } from '../components/filtercontext';
import Shimmer from './shimmer';
import LocationSelector from '../components/location'; // Import LocationSelector component
import Slider from './slider';
import ScrollToTopButton from './scrolltop';

const Home = ({ userSearch, setUserSearch, showModal, setShowModal }) => {
  const { filters, applyFilters } = useFilters();
  const [restaurants, setRestaurants] = useState([]);
  const [initialRestaurants, setInitialRestaurants] = useState([]);
  const [location, setLocation] = useState({
    lat: "17.485087",
    long: "78.528641"
  }); // Default location set to Sainikpuri
  const [locationSelected, setLocationSelected] = useState(true); // Set to true initially
  const [loading, setLoading] = useState(false); // State to track loading status
  let navigate = useNavigate();

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    setLocationSelected(true); // Set location selected to true when a radio button is clicked
  };

  useEffect(() => {
    if (locationSelected) {
      setLoading(true);
      setRestaurants([]);
      setInitialRestaurants([]);

      axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.lat}&lng=${location.long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        .then((res) => {
          const allRestaurants = res.data.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ?? [];
          setRestaurants(allRestaurants);
          setInitialRestaurants(allRestaurants);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching restaurant data:", error);
          setLoading(false);
        });
    }
  }, [location, locationSelected]);

  useEffect(() => {
    setRestaurants(prevRestaurants => applyFilters(prevRestaurants));
  }, [filters, applyFilters]);

  // Filter restaurants based on userSearch
  const filteredRestaurants = userSearch
    ? restaurants.filter(restaurant =>
        restaurant.info.name.toLowerCase().includes(userSearch.toLowerCase())
      )
    : restaurants;

  const handleModalClose = () => {
    setShowModal(false); // Close modal
  };

  return (
    <>
    <Slider/>
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {loading && locationSelected ? <Shimmer /> : null}
          <div className="row row-cols-1 row-cols-md-4 g-4 pt-4">
            {(filteredRestaurants.length > 0 ? filteredRestaurants : initialRestaurants).map((item, i) => (
              <div className="col" key={i} >
                <div className="card h-100">
                  <img className='card-img-top' src={`https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`} alt="Restaurant" />
                  <div className="card-body">
                    <h5 className="card-title">{item.info.name}</h5>
                    <p className="card-text">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <span style={{ marginLeft: "5px" }}>{item.info.avgRating ? item.info.avgRating : item.avgRatingString}</span>
                      <span style={{ marginLeft: "25px" }}><i className="fa-solid fa-motorcycle"></i>{" " + item.info.sla.slaString}</span>
                    </p>
                    <p style={{ marginBottom: "0px" }} className='card-text'>{item.info.cuisines.slice(0, 3).join(" , ")}</p>
                    <p style={{ marginTop: "5px" }} className='card-text'>{item.info.areaName}</p>
                    <div className="d-flex justify-content-center">
                      <button className='menubtn' id="searchbtn"
                      onClick = {()=>{
                        navigate(`/restaurant/${item.info.id}/${item.info.name}`)
                        console.log(item.info.id)
                      }}
                      >View Menu</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Search Locations</h5>
                <button type="button" style = {{color:"#ffffff"}} className="btn-close" aria-label="Close" onClick={handleModalClose}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body" style={{ maxHeight: "200px", overflowY: "auto" }}>
                <LocationSelector handleLocationChange={handleLocationChange} handleModalClose={handleModalClose} setLocation={setLocation} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <ScrollToTopButton/>
    </>
  );
};

export default Home;
