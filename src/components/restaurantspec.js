import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../components/restaurantspec.css';
import { addToCart } from './reducer';
import { useDispatch } from 'react-redux';
import ScrollToTopButton from './scrolltop';

function Restaurantspec() {
    const dispatch = useDispatch();
    const { restaurantId, restaurantName } = useParams();
    const [restaurantMenu, setRestaurantMenu] = useState([]);
    const [openAccordion, setOpenAccordion] = useState(0);
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(false); // State for loading

    useEffect(() => {
        axios
            .get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.37240&lng=78.43780&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`)
            .then((res) => {
                setRestaurantMenu(res.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(1) || []);
            })
            .catch((error) => {
                console.error('Error fetching restaurant menu:', error);
            });
    }, [restaurantId]);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const handleQuantityChange = (itemId, quantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [itemId]: quantity,
        }));
    };

    const handleAddToCart = (item) => {
        dispatch(
            addToCart({
                Name: item.card.info.name,
                Description: item.card.info.description,
                Price: item.card.info.price !== undefined ? item.card.info.price / 100 : item.card.info.defaultPrice !== undefined ? item.card.info.defaultPrice / 100 : 'Price not available',
                Img: `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600/${item.card.info.imageId}`,
                Quantity: quantities[item.card.info.id] || 1,
                RestaurantName: restaurantName, // Pass restaurant name to Redux
            })
        );
        if (window.innerWidth < 768) {
            alert('Item added to cart'); // Show alert only on mobile
        }
    };

    return (
        <div className="container">
            <h2 className="restaurant-title">{restaurantName} Menu</h2>
            {loading ? (
                    <div className="d-flex justify-content-center">
                         <div className="spinner-border" role="status" style={{color : "#FEA116"}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
            <div className="accordion" id="accordionExample">
                {restaurantMenu.map((item, i) => {
                    if (item?.card?.card?.itemCards) {
                        return (
                            <div className="accordion-item" key={i}>
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button ${openAccordion === i ? '' : 'collapsed'}`}
                                        type="button"
                                        onClick={() => toggleAccordion(i)}
                                        aria-expanded={openAccordion === i ? 'true' : 'false'}
                                        aria-controls={`collapse${i}`}
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${i}`}
                                    >
                                        <b className="category">
                                            {item.card.card.title} - {item?.card?.card?.itemCards.length}
                                        </b>
                                        <i
                                            className={`fas ${
                                                openAccordion === i ? 'fa-chevron-up' : 'fa-chevron-down'
                                            } accordion-icon`}
                                        ></i>
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${i}`}
                                    className={`accordion-collapse collapse ${openAccordion === i ? 'show' : ''}`}
                                    aria-labelledby={`heading${i}`}
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <div className="row row-cols-1 row-cols-md-4 g-2">
                                            {item?.card?.card?.itemCards?.map((item, j) => {
                                                const quantity = quantities[item.card.info.id] || 1;
                                                const price =
                                                    item.card.info.price !== undefined
                                                        ? item.card.info.price / 100
                                                        : item.card.info.defaultPrice !== undefined
                                                        ? item.card.info.defaultPrice / 100
                                                        : 'Price not available';
                                                return (
                                                    <div className="col" key={j}>
                                                        <div className="card">
                                                            <img
                                                                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`}
                                                                className="card-img-top food-pic"
                                                                alt={item.card.info.name}
                                                            />
                                                            <div className="card-body">
                                                                <h5 className="card-title">
                                                                    {item.card.info.name}
                                                                </h5>
                                                                {item?.card?.info?.ratings?.aggregatedRating
                                                                    ?.rating && (
                                                                    <p>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="16"
                                                                            height="16"
                                                                            fill="currentColor"
                                                                            className="bi bi-star-fill"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path
                                                                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                                                                            />
                                                                        </svg>
                                                                        {' ' +
                                                                            item.card.info.ratings
                                                                                .aggregatedRating.rating}
                                                                        <span
                                                                            style={{ marginLeft: '10px' }}
                                                                        >
                                                                            {
                                                                                item.card.info.ratings
                                                                                    .aggregatedRating
                                                                                    .ratingCount
                                                                            }
                                                                        </span>
                                                                        <br />
                                                                    </p>
                                                                )}
                                                                <p>
                                                                    <b>Price: </b> {price}
                                                                </p>
                                                                <b className="card-text">
                                                                    Select your quantity:{' '}
                                                                    <input
                                                                        type="number"
                                                                        className="quantity-input"
                                                                        value={quantity}
                                                                        min="1"
                                                                        onChange={(e) =>
                                                                            handleQuantityChange(
                                                                                item.card.info.id,
                                                                                parseInt(e.target.value)
                                                                            )
                                                                        }
                                                                    />
                                                                </b>
                                                                <br />
                                                                <br />
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <button
                                                                        className="restaurant-view"
                                                                        onClick={() =>
                                                                            handleAddToCart(item)
                                                                        }
                                                                    >
                                                                        Add to Cart
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>)}
            <ScrollToTopButton />
        </div>
    );
}

export default Restaurantspec;
