import { Fragment, useEffect, useState, useRef } from 'react';

import './Maps.css';

//Leaflet maps
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    GeoJSON,
} from 'react-leaflet'
import L from 'leaflet';

//headless ui
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

//MUI material
import Button from '@mui/material/Button';

//GeoJSON rute bikun
import jalurMerah from '../../data/JalurBikunMerah.json';
import jalurBiru from '../../data/JalurBikunBiru.json';

//Lokasi halte bikun
import halteMerah from '../../data/halteMerah.json';
import halteBiru from '../../data/halteBiru.json';

//Icons
import RouteIcon from '@mui/icons-material/Route';
import ForkLeftIcon from '@mui/icons-material/ForkLeft';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import redStopIcon from '../../assets/icons/bus-stop-red.png';
import blueStopIcon from '../../assets/icons/bus-stop-blue.png';

import io from 'socket.io-client';

//websocket connection
const socket = io('ws://localhost:4000', {
    withCredentials: true
});

//connection with server
socket.on('connect', () => {

    console.log('Connected to Server');

});

//when disconnected
socket.on('disconnect', function () {

    console.log('Disconnect from server')

});

const Maps = () => {

    const mainRef = useRef();

    const mapCenter = [-6.3616334, 106.8275797];
    const mapZoom = 15;

    const routeRef = useRef();
    const [route, setRoute] = useState(jalurMerah);
    const [halte, setHalte] = useState("merah");

    //bus location
    const [theSocketMessage, setTheSocketMessage] = useState(null);

    useEffect(() => {

        //Change displayed route
        if (routeRef.current) {

            routeRef.current.clearLayers();
            if (route != null) {

                routeRef.current.addData(route);
                if (route == jalurMerah) {

                    routeRef.current.setStyle({ color: 'red' });

                } else {

                    routeRef.current.setStyle({ color: 'blue' });

                }
            }
        }

        if (halte !== null) {

            if (route !== null) {

                if (route == jalurMerah) {

                    setHalte("merah");

                } else {

                    setHalte("biru");

                }
            }
        }
    }, [route, routeRef, halte]);

    socket.on('broadcast', (message) => {
        setTheSocketMessage(message.coordinate);
    });

    var handleChangeRoute = (e) => {

        if (route == jalurMerah) {

            setRoute(jalurBiru);
            if (halte != null) {

                setHalte("biru");

            }

        } else {

            setRoute(jalurMerah);
            if (halte != null) {

                setHalte("merah");

            }
        }
    }

    var handleRoute = (e) => {

        if (route == null) {

            setRoute(jalurMerah);

        } else {

            setRoute(null);

        }
    }

    var handleHalte = (e) => {

        if (halte == null) {

            if (route == jalurMerah) {

                setHalte("merah");

            } else {

                setHalte("biru");

            }
        } else {

            setHalte(null);

        }
    }

    var handleResetView = (e) => {

        mainRef.current.setView(mapCenter, mapZoom);

    }

    //Leaflet Icons
    const busStopRed = L.icon({
        iconUrl: redStopIcon,
        iconSize: [30, 30],
        iconAnchor: [12, 28],
        popupAnchor: [4, -24],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    })

    const busStopBlue = L.icon({
        iconUrl: blueStopIcon,
        iconSize: [30, 30],
        iconAnchor: [12, 28],
        popupAnchor: [4, -24],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    })

    return (
        <>
            <div className="absolute z-[1001] pt-2 lg:right-1/3 right-0 pr-2">
                <div className="flex space-x-2">
                    <Button variant="contained" size="medium" style={{ backgroundColor: "#FFFFFF" }} onClick={() => handleChangeRoute()}> <ForkLeftIcon style={{ color: "#000000" }} /> </Button>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-sm bg-white bg-opacity-100 px-4 py-2 text-sm font-medium text-black hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75 ring-2 ring-slate-300">
                                Menu
                                <ChevronDownIcon
                                    className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} 
                                                group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                onClick={() => handleRoute()}
                                            >
                                                <RouteIcon />
                                                Rute
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} 
                                                group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                onClick={() => handleHalte()}
                                            >
                                                <DirectionsBusIcon />
                                                Halte
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} 
                                                group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                onClick={() => handleResetView()}
                                            >
                                                <RestartAltIcon />
                                                Reset View
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>

            <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} ref={mainRef}>

                <TileLayer
                    attribution='&copy; <a href="https://www.google.com/help/legalnotices_maps/">Google</a> Maps'
                    url="http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                />

                <GeoJSON data={route} ref={routeRef} style={{ color: 'red' }} />

                {halte == "merah" ?
                    halteMerah.map(lokasi => (

                        <Marker icon={busStopRed} position={[lokasi.coordinate[1], lokasi.coordinate[0]]}>
                            <Popup>
                                Halte <br></br>
                                {lokasi.namaHalte}
                            </Popup>
                        </Marker>

                    )) : halte == "biru" ?
                        halteBiru.map(lokasi => (

                            <Marker icon={busStopBlue} position={[lokasi.coordinate[1], lokasi.coordinate[0]]}>
                                <Popup>
                                    Halte <br></br>
                                    {lokasi.namaHalte}
                                </Popup>
                            </Marker>

                        )) : null
                }

                {theSocketMessage == null ? null :
                    theSocketMessage.map(busses => (
                        <Marker icon={busses.type == "merah" ? busStopRed : busStopBlue} position={busses.coordinate}></Marker>))}
            </MapContainer>
        </>
    )
}

export default Maps;