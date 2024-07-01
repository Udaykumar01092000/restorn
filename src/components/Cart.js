import React from 'react';
import './cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, increaseQuantity } from './reducer';
import ScrollToTopButton from './scrolltop';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cartItems);

    let totalPrice = cartItems.reduce((acc, item) => {
        const price = parseFloat(item.Price);
        const quantity = parseInt(item.Quantity);
        return acc + (price * quantity);
    }, 0);

    let discount = 0; // No discount

    if (totalPrice > 999) {
        discount = totalPrice * 0.1; // 10% discount
    }

    const totalAmount = totalPrice - discount; // Calculate total amount after discount

    // Handle clear cart logic
    const handleClearCart = () => {
        const confirmClear = window.confirm('Are you sure you want to clear the cart?');
        if (confirmClear) {
            dispatch(clearCart());
            alert('Cart cleared successfully');
        }
    };

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
            alert('Please purchase items to place an order');
        } else {
            const confirmOrder = window.confirm('Are you sure you want to place the order?');
            if (confirmOrder) {
                navigate('/print-bill'); // Navigate to Print Bill page
            }
        }
    };

    const handleIncreaseQuantity = (index) => {
        dispatch(increaseQuantity({ index, quantityToAdd: 1 }));
    };

    return (
        <>
            <div className="cart-container">
                <div className="cart-header">
                    <h2 className="header">Shopping Cart</h2>
                    <div>
                        <p className="header">Number of items: <b>{cartItems.length}</b></p>
                        <button
                            className="removecart"
                            style={{ width: "200px" }}
                            onClick={handleClearCart} // Call handleClearCart to clear the cart
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
                <div className="cart-items">
                    {cartItems.map((item, i) => (
                        <div className="cart-item" key={i}>
                            <h1 className="restitle">Restaurant: {item.RestaurantName}</h1>
                            <img src={item.Img} alt={item.Name} />
                            <div className="cart-item-details">
                                <h3 className="restitle">{item.Name}</h3>
                                <p>{item.Description}</p>
                            </div>
                            <div className="cart-item-price">
                                <label><b>Price : &#8377;</b> {parseFloat(item.Price).toFixed(2)}</label>
                            </div>
                            <div className="cart-item-quantity">
                                <label><b>Quantity:</b> {item.Quantity}</label><br/>
                                <button
                                    className="order"
                                    onClick={() => handleIncreaseQuantity(i)}
                                >
                                    + Increase Quantity
                                </button>
                            </div>
                            <div className="cart-item-total">
                                <b>Total: &#8377;</b> {(parseFloat(item.Price) * parseInt(item.Quantity)).toFixed(2)}
                            </div>
                            <button
                                className="removecart"
                                id={`removecart-${i}`}
                                onClick={() => {
                                    const quantityToRemove = parseInt(prompt(`Enter quantity to remove for ${item.Name}:`, item.Quantity));
                                    if (!isNaN(quantityToRemove) && quantityToRemove > 0) {
                                        dispatch(removeFromCart({ index: i, quantity: quantityToRemove }));
                                    }
                                }}
                            >
                                Remove From Cart
                            </button>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <h4>Order Summary</h4>
                    <div className="cart-summary-item">
                        Total Price: <b>&#8377;</b> {totalPrice.toFixed(2)}
                    </div>
                    {(totalPrice <= 999 && totalPrice >= 1) && (
                        <div className="cart-summary-item">
                            <em style={{ color: "red" }}>* (To avail the discount of 10%, the purchase price must exceed 999)</em>
                        </div>
                    )}
                    {totalPrice > 999 && (
                        <div className="cart-summary-item">
                            Discount: <b>&#8377;</b> {discount.toFixed(2)}
                        </div>
                    )}
                    <div className="cart-summary-item">
                        Total Amount: <b>&#8377;</b> {totalAmount.toFixed(2)}
                    </div>
                    <button className="order" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            </div>
            <ScrollToTopButton />
        </>
    );
}

export default Cart;





























