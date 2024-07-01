import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/searchdishes.css';
import { addToCart } from './reducer';
import { useDispatch } from 'react-redux';
import ScrollToTopButton from './scrolltop';

function SearchDishes() {
    const [dishName, setDishName] = useState('');
    const [dishes, setDishes] = useState([]);
    const [quantities, setQuantities] = useState({}); // State for quantities
    const [loading, setLoading] = useState(false); // State for loading

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (dishName.length > 2) {
            setLoading(true);
            axios.get(
                    `https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.372040&lng=78.43780&str=${dishName}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=e8f976e5-270e-3d4d-aca0-573a2513c73a`
                )
                .then((res) => {
                    if (
                        res.data.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH &&
                        res.data.data.cards[1].groupedCard.cardGroupMap.DISH.cards.length > 1
                    ) {
                        setDishes(res.data.data?.cards[1]?.groupedCard?.cardGroupMap.DISH.cards.slice(1));
                    } else {
                        setDishes([]);
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setDishes([]);
                    setLoading(false);
                });
        } else {
            setDishes([]);
        }
    }, [dishName]);

    const handleQuantityChange = (id, value) => {
        setQuantities({ ...quantities, [id]: value });
    };

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h2>Search Dishes</h2>
                <form className="d-flex justify-content-center" role="search">
                    <div className="col-md-6 col-lg-4 m-2 clearable-input">
                        <input
                            className="form-control"
                            value={dishName}
                            onChange={(e) => {
                                setDishName(e.target.value);
                            }}
                            type="search"
                            placeholder="Search the dishes"
                            aria-label="Search"
                        />
                    </div>
                </form>
            </div>
            <br />
            <div className="container">
                {loading ? (
                    <div style={{ textAlign: 'center' }}>
                          <div className="spinner-border" role="status" style={{color : "#FEA116"}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 g-2">
                        {dishes.map((item, i) => {
                            const dishId = item?.card?.card?.info?.id;
                            const quantity = quantities[dishId] || 1; // Default quantity is 1

                            return (
                                <div className="col" key={i}>
                                    <div className="card h-100 p-4" id="dishescard">
                                        <h1 className="card-title" id="restaurantname">
                                            {item?.card?.card?.restaurant?.info?.name}
                                        </h1>
                                        <h6 className="card-rating">Rating, Time to deliver</h6>
                                        <h5 className="card-rating">&#8377;{item?.card?.card?.info?.price / 100}</h5>
                                        <div>
                                            <button
                                                className="restaurant-view"
                                                onClick={() => {
                                                    navigate(
                                                        `/restaurant/${item?.card?.card?.restaurant?.info?.id}/${item?.card?.card?.restaurant?.info?.name}`
                                                    );
                                                }}
                                            >
                                                View Restaurant
                                            </button>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <img
                                                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600/${item?.card?.card?.info?.imageId}`}
                                                    className="card-img-top h-10"
                                                    alt="..."
                                                />
                                            </div>
                                            <div className="card-body col-6">
                                                <h5 className="card-title">{item?.card?.card?.info?.name}</h5>
                                                <p className="card-text" id="card-desc">
                                                    {item?.card?.card?.info?.description}
                                                </p>
                                                <input
                                                    type="number"
                                                    value={quantity}
                                                    onChange={(e) => handleQuantityChange(dishId, parseInt(e.target.value))}
                                                />
                                                <br />
                                                <br />
                                                <button
                                                    onClick={() => {
                                                        dispatch(
                                                            addToCart({
                                                                Name: item?.card?.card?.info?.name,
                                                                Description: item?.card?.card?.info?.description,
                                                                Price: item?.card?.card?.info?.price / 100,
                                                                Img: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600/${item?.card?.card?.info?.imageId}`,
                                                                Quantity: quantity,
                                                                RestaurantName: item?.card?.card?.restaurant?.info?.name, // Include RestaurantName
                                                            })
                                                        );
                                                        setQuantities({ ...quantities, [dishId]: 1 }); // Reset quantity after adding to cart
                                                    }}
                                                    className="restaurant-view"
                                                >
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <ScrollToTopButton />
        </div>
    );
}

export default SearchDishes;
