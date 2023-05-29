import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

const Map = ({ lat, lng, setValues }) => {
  return (
    <MapContainer
      style={{
        height: '500px',
        width: '100%',
        overflow: 'hidden',
      }}
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={false}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <LocationMarker setPosition={setValues} position={{ lat, lng }} />
    </MapContainer>
  );
};

function LocationMarker({ setPosition, position }) {
  useMapEvents({
    click(e) {
      setPosition((values) => {
        return {
          ...values,
          location: {
            ...values.location,
            lat: e.latlng.lat,
            lng: e.latlng.lng,
          },
        };
      });
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default Map;
