import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BasketSection from './Basket';
import MainCourseSection from './MainCourseSection'; 
import DrinkSection from './DrinkSection';
import DessertSection from './DessertSection';
import Homepage from './Homepage'; 
import OrderSummary from './OrderSummary';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faBasketShopping, faCake, faGlassWater, faBars } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [basketItems, setBasketItems] = useState([]);
  const [generatedTicketNumber, setGeneratedTicketNumber] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const addToBasket = (item) => {
    const updatedBasket = [...basketItems, item];
    setBasketItems(updatedBasket);
    console.log("Updated Basket Items:", updatedBasket);
  };

  const removeFromBasket = (index) => {
    const updatedBasket = [...basketItems];
    updatedBasket.splice(index, 1);
    setBasketItems(updatedBasket);
  };

  const reduceQuantity = (index, quantityToRemove) => {
    const updatedBasketItems = [...basketItems];
    const updatedItem = { ...updatedBasketItems[index] };
    
    // Check if the quantity to remove is greater than the current quantity
    if (quantityToRemove >= updatedItem.quantity) {
      // Set quantity to 0
      updatedItem.quantity = 0;
    } else {
      updatedItem.quantity -= quantityToRemove;
    }
  
    updatedBasketItems[index] = updatedItem;
  
    setBasketItems(updatedBasketItems);
  };
  const addQuantity = (index, amount) => {
    const updatedBasket = [...basketItems];
    updatedBasket[index].quantity += amount;
    setBasketItems(updatedBasket);
  };

  const placeOrder = () => {
    const generatedTicketNumber = Math.floor(Math.random() * 1000000);
    setGeneratedTicketNumber(generatedTicketNumber); // Set the generated ticket number
    console.log('Placing order:', basketItems);
    setBasketItems([]);
  };

  const openNavbar = () => {
    setSidebarOpen(true);
  };

  return (
    <Router>
      <div className="app">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <nav className={`navbar ${sidebarOpen ? 'open' : ''}`}>
          <h2>Anre Foodshop</h2>
          <h3>best since 1996</h3>
          <div className="separator"></div>
          <h3>Menu</h3>
          <ul>
            <li>
              <Link to="/main-course">
                <FontAwesomeIcon icon={faUtensils} /> Main Course
              </Link>
            </li>
            <li>
              <Link to="/drink">
                <FontAwesomeIcon icon={faGlassWater} /> Drinks
              </Link>
            </li>
            <li>
              <Link to="/dessert">
                <FontAwesomeIcon icon={faCake} /> Dessert
              </Link>
            </li>
          </ul>
          <h3>Order</h3>
          <ul>
            <li>
              <Link to="/basket">
                <FontAwesomeIcon icon={faBasketShopping} /> Basket
              </Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/homepage" />} />
            <Route path="/homepage" element={<Homepage onOpenNavbar={openNavbar} />} />
            <Route path="/main-course" element={<MainCourseSection addToBasket={addToBasket} />} />
            <Route path="/drink" element={<DrinkSection addToBasket={addToBasket} />} />
            <Route path="/dessert" element={<DessertSection addToBasket={addToBasket} />} />
            <Route
              path="/order-summary"
              element={<OrderSummary basketItems={basketItems} ticketNumber={generatedTicketNumber} />}
            />
            <Route
              path="/basket"
              element={<BasketSection
                basketItems={basketItems}
                onPlaceOrder={placeOrder}
                onRemoveItem={removeFromBasket}
                onReduceQuantity={reduceQuantity}
                addQuantity={addQuantity}
              />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
