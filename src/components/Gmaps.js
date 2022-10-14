import React, { useEffect, useState, useRef } from 'react';
import {
    MapContainer,
    TileLayer,
    LayersControl,
    LayerGroup,
    FeatureGroup,
    Marker,
    Circle,
    Popup,
    GeoJSON

} from 'react-leaflet'
import L from 'leaflet';

import merah from './JalurBikunMerah.json'

const Gmaps = () => {

    let reference;
    useEffect(() => {
        reference = React.createRef();
    }, []);

    const busStop = L.icon({
        iconUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.PvhWU6cToMl7Ji0LqnPMJQHaHa%26pid%3DApi&f=1&ipt=bb850850150200790e4effc1d35f990bb34774fb32333c9a8fb16bf32aa91eb7&ipo=images',
        iconSize: [30, 30],
        iconAnchor: [32, 64],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    return (
        <>

            <MapContainer center={[-6.362766427826849, 106.82694508342003]} zoom={15} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.google.com/help/legalnotices_maps/">Google</a> Maps'
                    url="http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                />
                <GeoJSON data={merah} style={{ color: 'red' }} />
                <Marker icon={busStop} position={[-6.360804892417688, 106.83160041986518]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    )
}

export default Gmaps;