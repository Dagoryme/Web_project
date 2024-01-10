// DropdownMenu.js

import React, { useState, useRef, useEffect } from 'react';
import './DropDownMenu.css';

const DropdownMenu = (props) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showDrinkForm, setShowDrinkForm] = useState(false);
  const [showPriceForm, setShowPriceForm] = useState(false);
  const [drinkValue, setDrinkValue] = useState('');
  const [priceValue, setPriceValue] = useState(0);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (menuItem) => {
    setShowPriceForm(false); // Fermer le formulaire de prix s'il est ouvert
    setShowDrinkForm(false); // Fermer le formulaire de boisson s'il est ouvert

    switch(menuItem){
      case 'price':
        setShowPriceForm(true);
        
        break;
      case 'drink':
        setShowDrinkForm(true);
        break;
      default:
        break;
    }
    console.log(`Cliqué sur : ${menuItem}`);
    setMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !showDrinkForm && // Ne fermer que si le formulaire de boisson n'est pas ouvert
      !showPriceForm    // Ne fermer que si le formulaire de prix n'est pas ouvert
    ) {
      // Clic en dehors du menu, fermer le menu
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    // Ajouter un écouteur d'événements globaux pour détecter les clics en dehors du menu
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Nettoyer l'écouteur d'événements lors du démontage du composant
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDrinkForm, showPriceForm]); // Ajout des états dans la dépendance

  return (
    <div className="dropdown-menu" ref={dropdownRef}>
      <div className={`logo ${isMenuOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
        Logo
      </div>

      <div className={`menu-items ${isMenuOpen ? 'active' : ''}`}>
        <a href="#/price" onClick={() => handleMenuItemClick('price')}>Search based on price</a>
        <a href="#/drink" onClick={() => handleMenuItemClick('drink')}>Search based on drink</a>
      </div>

      {showDrinkForm && (
        <div className="form-container">
          <label>
            Drink Name:
            <input type="text" value={drinkValue} onChange={(e) => setDrinkValue(e.target.value)} />
          </label>
          <button onClick={() => setShowDrinkForm(false)}>Rechercher</button>
        </div>
      )}

      {showPriceForm && (
        <div className="form-container">
          <label>
            Maximum Price:
            <input type="number" value={priceValue} onChange={(e) => setPriceValue(Number(e.target.value))} />
          </label>
          <button onClick={() => setShowPriceForm(false)}>Rechercher</button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
