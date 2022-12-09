import L from "leaflet";

import redBusIcon from "../../assets/icons/bus-icon-red.png";
import blueBusIcon from "../../assets/icons/bus-icon-blue.png";
import redStopIcon from "../../assets/icons/bus-stop-red.png";
import blueStopIcon from "../../assets/icons/bus-stop-blue.png";

//Leaflet Icons
export const redBus = L.icon({
    iconUrl: redBusIcon,
    iconSize: [32, 32],
    iconAnchor: [15, 20],
    popupAnchor: [4, -24],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
});

export const blueBus = L.icon({
    iconUrl: blueBusIcon,
    iconSize: [32, 32],
    iconAnchor: [15, 20],
    popupAnchor: [4, -24],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
});

export const busStopRed = L.icon({
    iconUrl: redStopIcon,
    iconSize: [35, 35],
    iconAnchor: [17, 30],
    popupAnchor: [2, -24],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
});

export const busStopBlue = L.icon({
    iconUrl: blueStopIcon,
    iconSize: [35, 35],
    iconAnchor: [17, 30],
    popupAnchor: [2, -24],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
});