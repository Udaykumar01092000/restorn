import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from './scrolltop';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SearchRestaurants() {
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        if (restaurantName) {
            setLoading(true);
            axios
                .get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.37240&lng=78.43780&str=${restaurantName}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=3445c27e-9767-0109-930c-a7c5b2183e33`)
                .then((res) => {
                    setRestaurants(res.data.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT || []);
                })
                .finally(() => {
                    setLoading(false); // Stop loading after API call
                });
        } else {
            setRestaurants([]);
        }
    }, [restaurantName]);

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Search Restaurants</h1>
            <form className="d-flex justify-content-center" role="search">
                <div className="col-md-6 col-lg-4 m-2 clearable-input">
                    <input
                        className="form-control"
                        value={restaurantName}
                        onChange={(e) => {
                            setRestaurantName(e.target.value);
                        }}
                        type="search"
                        placeholder="Search Restaurants By Name"
                        aria-label="Search"
                    />
                </div>
            </form>
            <div className="container">
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status" style={{color : "#FEA116"}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {restaurants?.cards?.map((item, i) => {
                            if (item?.card?.card?.info) {
                                return (
                                    <div className="col" key={i}>
                                        <div className="card h-100">
                                            <img className='card-img-top' src={`https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,w_660/${item?.card?.card?.info?.cloudinaryImageId}`} alt="Restaurant" />
                                            <div className="card-body">
                                                <h5 className="card-title">{item?.card?.card?.info?.name}</h5>
                                                <p className="card-text">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                    </svg>
                                                    <span style={{ marginLeft: "5px" }}>{item?.card?.card?.info?.avgRating ? item?.card?.card?.info?.avgRating : item?.card?.card?.info?.avgRatingString}</span>
                                                    <span style={{ marginLeft: "25px" }}><i className="fa-solid fa-motorcycle"></i>{" " + item?.card?.card?.info?.sla.slaString}</span>
                                                </p>
                                                <p style={{ marginBottom: "0px" }} className='card-text'>{item?.card?.card?.info?.cuisines.slice(0, 3).join(" , ")}</p>
                                                <p style={{ marginTop: "5px" }} className='card-text'>{item?.card?.card?.info?.areaName}</p>
                                                <div className="d-flex justify-content-center">
                                                    <button className='menubtn' id="searchbtn"
                                                        onClick={() => {
                                                            navigate(`/restaurant/${item?.card?.card?.info?.id}/${item?.card?.card?.info?.name}`);
                                                        }}
                                                    >View Menu</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else if (item?.card?.card?.restaurants) {
                                return (
                                    <>
                                        {item?.card?.card?.restaurants.map((item, i) => {
                                            return (
                                                <div className="col" key={i}>
                                                    <div className="card h-100">
                                                        <img className='card-img-top' src={`https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,w_660/${item?.info.cloudinaryImageId}`} alt="Restaurant" />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item?.info.name}</h5>
                                                            <p className="card-text">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                                </svg>
                                                                <span style={{ marginLeft: "5px" }}>{item?.info.avgRating ? item?.info.avgRating : item?.info.avgRatingString}</span>
                                                                <span style={{ marginLeft: "25px" }}><i className="fa-solid fa-motorcycle"></i>{" " + item?.info.sla.slaString}</span>
                                                            </p>
                                                            <p style={{ marginBottom: "0px" }} className='card-text'>{item?.info.cuisines.slice(0, 3).join(" , ")}</p>
                                                            <p style={{ marginTop: "5px" }} className='card-text'>{item?.info.areaName}</p>
                                                            <div className="d-flex justify-content-center">
                                                                <button className='menubtn' id="searchbtn"
                                                                    onClick={() => {
                                                                        navigate(`/restaurant/${item?.card?.card?.info?.id}/${item?.card?.card?.info?.name}`);
                                                                    }}
                                                                >View Menu</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>
                                )
                            }
                        })}
                    </div>
                )}
            </div>
            <ScrollToTopButton />
        </div>
    )
}
