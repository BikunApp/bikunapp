import { useEffect, useState, useRef } from 'react';
import {
    MapContainer,
    TileLayer,
    LayersControl,
    LayerGroup,
    FeatureGroup,
    Marker,
    Circle,
    Popup,

} from 'react-leaflet'

const Gmaps = () => {
    return (
        <>

            <MapContainer center={[-6.362766427826849, 106.82694508342003]} zoom={15} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                />
                
            </MapContainer>

        </>
    )
}

export default Gmaps;