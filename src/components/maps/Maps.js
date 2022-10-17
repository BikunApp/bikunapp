import { Fragment, useEffect, useState, useRef } from 'react';

import './Maps.css';

//Leaflet maps
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

//Icons
import RouteIcon from '@mui/icons-material/Route';
import ForkLeftIcon from '@mui/icons-material/ForkLeft';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PlaceIcon from '@mui/icons-material/Place';

const Gmaps = () => {

    const ref = useRef(null);

    const routeRef = useRef();
    const [route, setRoute] = useState(jalurMerah);
    const [halte, setHalte] = useState("merah");

    useEffect(() => {
        console.log(halteMerah[0]);
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

    }, [route, routeRef]);

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

    // const busStop = L.icon({
    //     iconUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.PvhWU6cToMl7Ji0LqnPMJQHaHa%26pid%3DApi&f=1&ipt=bb850850150200790e4effc1d35f990bb34774fb32333c9a8fb16bf32aa91eb7&ipo=images',
    //     iconSize: [30, 30],
    //     iconAnchor: [32, 64],
    //     popupAnchor: null,
    //     shadowUrl: null,
    //     shadowSize: null,
    //     shadowAnchor: null
    // });

    const busStop = L.icon({
        iconUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flibrary.kissclipart.com%2F20181001%2Fjye%2Fkissclipart-bus-clipart-bus-stop-public-transport-timetable-3dce917fba791f97.png&f=1&nofb=1&ipt=cafff30e0501e05b4edb388c027c7ddb0f2b5f964cdad75673d9c9df85f5e4ed&ipo=images',
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
                            <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>

            <MapContainer center={[-6.3616334, 106.8275797]} zoom={15} scrollWheelZoom={true}>

                <TileLayer
                    attribution='&copy; <a href="https://www.google.com/help/legalnotices_maps/">Google</a> Maps'
                    url="http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                />

                <GeoJSON data={route} ref={routeRef} style={{ color: 'red' }} />

                {halte == "merah" ?
                    halteMerah.map(lokasi => (

                        <Marker icon={busStop} position={[lokasi.coordinate[1], lokasi.coordinate[0]]}>
                            <Popup>
                                Halte <br></br>
                                {lokasi.namaHalte}
                            </Popup>
                        </Marker>

                    )) : halte == "biru" ?
                        halteMerah.map(lokasi => (

                            <Marker icon={busStop} position={[lokasi.coordinate[1], lokasi.coordinate[0]]}>
                                <Popup>
                                    Halte <br></br>
                                    {lokasi.namaHalte}
                                </Popup>
                            </Marker>

                        )) : null
                }




                {/* <Marker icon={busStop} position={[-6.360804892417688, 106.83160041986518]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
            </MapContainer>
        </>
    )
}



function EditInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}

function EditActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}

function DuplicateInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4H12V12H4V4Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path
                d="M8 8H16V16H8V8Z"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}

function DuplicateActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4H12V12H4V4Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path
                d="M8 8H16V16H8V8Z"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}

function ArchiveInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="8"
                width="10"
                height="8"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <rect
                x="4"
                y="4"
                width="12"
                height="4"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    )
}

function ArchiveActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="8"
                width="10"
                height="8"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <rect
                x="4"
                y="4"
                width="12"
                height="4"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    )
}

function MoveInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
            <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
            <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    )
}

function MoveActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
        </svg>
    )
}

function DeleteInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#EDE9FE"
                stroke="#A78BFA"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
        </svg>
    )
}

function DeleteActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#8B5CF6"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
        </svg>
    )
}


export default Gmaps;