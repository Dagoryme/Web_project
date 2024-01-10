import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Banner from './BannerTop';
import DropdownMenu from './DropDownMenu';
import Slider from './Slider';
import './App.css';

function App() {
  const [currLocation, setCurrLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [positionLoaded, setPositionLoaded] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    getLocation();
    fetchGreeting(); // Ajout de l'appel à la fonction fetchGreeting au chargement initial
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrLocation({ latitude, longitude });
      setPositionLoaded(true);
    });
  };

  const addMarker = (newMarker) => {
    const markercopy = [...markers, newMarker];
    setMarkers(markercopy);
    setForceUpdate(!forceUpdate);
  };

  const removeMarker = (index) => {
    const updateArray = markers.filter((marker) => markers.indexOf(marker) !== index);
    setMarkers(updateArray);
  };

  const updateMarkerPosition = (markerIndex, newPosition) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker, index) =>
        index === markerIndex ? { ...marker, ...newPosition } : marker
      )
    );
  };

  const getMarkersList = () => {
    return markers;
  };

  // Fonction pour effectuer la requête vers le serveur Express
  const fetchGreeting = async () => {
  try {
    // Utilisez le chemin /api pour accéder à votre API via le reverse proxy
    const response = await fetch('/api/');
    const data = await response.json();
    setGreeting(data); // Mettre à jour l'état avec la réponse du serveur
  } catch (error) {
    console.error('Erreur lors de la récupération du message du serveur.', error);
  }
};

  return (
    <>
      <div>
        <DropdownMenu
          addMarker={addMarker}
          updateMarkerPosition={updateMarkerPosition}
          removeMarker={removeMarker}
          getMarkersList={getMarkersList}
        />
      </div>
      <div>
        <Banner />
      </div>
      <div>
        <Slider />
      </div>

      {/* Afficher le message du serveur */}
      <div>
        <p>{greeting}</p>
      </div>

      {positionLoaded && (
        <MapContainer
          key={forceUpdate}
          center={[currLocation.latitude, currLocation.longitude]}
          zoom={13}
          style={{ height: '100vh', zIndex: 0 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Afficher tous les marqueurs sur la carte */}
          {markers.map((marker, index) => (
            <Marker key={index} position={[marker.latitude, marker.longitude]}>
              {/* Ajoutez ici le contenu du popup si nécessaire */}
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
}

export default App;
