// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearCart } from './reducer';
// import './printbill.css';

// function PrintBill() {
//     const dispatch = useDispatch();
//     const cartItems = useSelector((state) => state.cartItems);

//     let totalPrice = cartItems.reduce((acc, item) => {
//         const price = parseFloat(item.Price);
//         const quantity = parseInt(item.Quantity);
//         return acc + (price * quantity);
//     }, 0);

//     let discount = 0; // No discount

//     if (totalPrice > 999) {
//         discount = totalPrice * 0.1; // 10% discount
//     }

//     const totalAmount = totalPrice - discount; // Calculate total amount after discount

//     const handlePrint = () => {
//         if (totalPrice === 0) {
//             alert('Please order items to print the bill.');
//         } 
//         else{
//             window.print();
//             dispatch(clearCart()); // Clear the cart after printing
//             alert('Please receive your   bill');
//         }
//     };

//     return (
//         <div className="print-bill-container">
//             <h1 className={`text-primary m-0`} id="headtitle">
//             <i className="fa fa-utensils me-3"></i>Restoran
//           </h1><br/>
//             <h2 class = "bill-text">Order Bill</h2>
//             <div className="bill-items">
//                 {cartItems.map((item, i) => (
//                     <div className="bill-item" key={i}>
//                         <h3 class = "bill-text">{item.Name}</h3>
//                         <p class = "bill-text">Quantity: {item.Quantity}</p>
//                         <p class = "bill-text">Price: &#8377;{parseFloat(item.Price).toFixed(2)}</p>
//                         <p class = "bill-text">Total: &#8377;{(parseFloat(item.Price) * parseInt(item.Quantity)).toFixed(2)}</p>
//                     </div>
//                 ))}
//             </div>
//             <div className="bill-summary">
//                 <div class = "bill-text">Total Price: &#8377;{totalPrice.toFixed(2)}</div>
//                 {totalPrice > 999 && (
//                     <div class = "bill-text">Discount: &#8377;{discount.toFixed(2)}</div>
//                 )}
//                 <div class = "bill-text">Total Amount: &#8377;{totalAmount.toFixed(2)}</div>
//             </div><br/>
//             <button className="print-bill-button" onClick={handlePrint}>
//                 Print Bill
//             </button>
//         </div>
//     );
// }

// export default PrintBill;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from './reducer';
import './printbill.css';

function PrintBill() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cartItems);

    // Group items by restaurant
    const itemsByRestaurant = cartItems.reduce((acc, item) => {
        if (!acc[item.RestaurantName]) {
            acc[item.RestaurantName] = [];
        }
        acc[item.RestaurantName].push(item);
        return acc;
    }, {});

    // Calculate totals for each restaurant
    const totalsByRestaurant = Object.keys(itemsByRestaurant).reduce((acc, restaurantName) => {
        const total = itemsByRestaurant[restaurantName].reduce((sum, item) => {
            const price = parseFloat(item.Price);
            const quantity = parseInt(item.Quantity);
            return sum + (price * quantity);
        }, 0);
        acc[restaurantName] = total;
        return acc;
    }, {});

    const totalPrice = Object.values(totalsByRestaurant).reduce((acc, total) => acc + total, 0);

    let discount = 0; // No discount

    if (totalPrice > 999) {
        discount = totalPrice * 0.1; // 10% discount
    }

    const totalAmount = totalPrice - discount; // Calculate total amount after discount

    const handlePrint = () => {
        if (totalPrice === 0) {
            alert('Please order items to print the bill.');
        } else {
            window.print();
            dispatch(clearCart()); // Clear the cart after printing
            alert('Please receive your bill');
        }
    };

    return (
        <div className="print-bill-container">
            <h1 className="text-primary m-0" id="headtitle">
                <i className="fa fa-utensils me-3"></i>Restoran
            </h1><br />
            <h2 className="bill-head">Order Bill</h2>
            {Object.keys(itemsByRestaurant).map((restaurantName, index) => (
                <ol style = {{listStyleType : "square"}}>
                <div key={index} className="restaurant-section">
                    
                    <div className='bill-item'>
                        <h3 className="restaurant-name"><li>{restaurantName}</li></h3>
                    </div>
                    <div className="bill-items">
                        {itemsByRestaurant[restaurantName].map((item, i) => (
                            <div className="bill-item" key={i}>
                                <h3 className="restaurant-name">{item.Name}</h3>
                                <p className="bill-text">Quantity: {item.Quantity}</p>
                                <p className="bill-text">Price: &#8377;{parseFloat(item.Price).toFixed(2)}</p>
                                <p className="bill-text">Total: &#8377;{(parseFloat(item.Price) * parseInt(item.Quantity)).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="restaurant-total">
                        <div className="bill-text">
                            <h3><b className='restaurant-name'>Restaurant Total:</b> &#8377;{totalsByRestaurant[restaurantName].toFixed(2)}</h3></div>
                    </div>
                    
                </div>
                </ol>
            ))}
            <div className="bill-summary">
                <div className="bill-text">Total Price: &#8377;{totalPrice.toFixed(2)}</div>
                {totalPrice > 999 && (
                    <div className="bill-text">Discount: &#8377;{discount.toFixed(2)}</div>
                )}
                <div className="bill-text">Total Amount: &#8377;{totalAmount.toFixed(2)}</div>
            </div><br />
            <button className="print-bill-button" onClick={handlePrint}>
                Print Bill
            </button>
        </div>
    );
}

export default PrintBill;
