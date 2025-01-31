import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculates the total cost of all items in the cart.
  const calculateTotalAmount = () => {
    if (!cart || cart.length === 0) return 0;

    return cart
      .reduce((acc, item) => {
        // Strip out any non-numeric characters (like "$")
        const numericCost = parseFloat(item.cost.replace(/[^\d.]/g, '')) || 0;
        return acc + numericCost * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // Calculates the subtotal for a single item: (cost * quantity)
  const calculateTotalCost = (item) => {
    // Strip out any non-numeric characters (like "$")
    const numericCost = parseFloat(item.cost.replace(/[^\d.]/g, '')) || 0;
    return (numericCost * item.quantity).toFixed(2);
  };

  // Allows user to go back to the listing page to continue shopping.
  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  // Increments item quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrements item quantity (remove if 0)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Removes item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // (Optional) checkout placeholder
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              {/* Show the item name */}
              <div className="cart-item-name">{item.name}</div>

              {/* Use item.cost directly in the UI since it already has a "$" */}
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount">
        {/* You can place any additional summary info here if you want */}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
