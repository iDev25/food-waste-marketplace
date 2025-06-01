import { useState, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};
const center = {
  lat: 43.6532, // Default to Toronto
  lng: -79.3832,
};

const LocationPicker = ({ onLocationSelect }) => {
  // Load Google Maps API
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState('');
  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const handleSelect = async (address) => {
    setAddress(address);
    
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
      panTo({ lat, lng });
      
      // Pass the location data to parent component
      if (onLocationSelect) {
        onLocationSelect({
          address,
          lat,
          lng
        });
      }
    } catch (error) {
      console.error("Error selecting location:", error);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="location-picker">
      <PlacesAutocomplete setSelected={handleSelect} />
      
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={selected || center}
        onLoad={onMapLoad}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  );
};

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (address) => {
    setValue(address, false);
    clearSuggestions();
    setSelected(address);
  };

  return (
    <div className="mb-4">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter your business address"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default LocationPicker;
