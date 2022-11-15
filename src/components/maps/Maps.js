import { Fragment, useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Backdrop from '@mui/material/Backdrop';

import About from '../info/About';
import './Maps.css';
import 'react-toastify/dist/ReactToastify.css';

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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import redBusIcon from '../../assets/icons/bus-icon-red.png';
import blueBusIcon from '../../assets/icons/bus-icon-blue.png';
import redStopIcon from '../../assets/icons/bus-stop-red.png';
import blueStopIcon from '../../assets/icons/bus-stop-blue.png';


import io from 'socket.io-client';

import * as mqtt from 'react-paho-mqtt';

// //websocket connection
// const socket = io('wss://bikunapp-backend.onrender.com', {
//     withCredentials: true
// });

// //connection with server
// socket.on('connect', () => {

//     console.log('Connected to Server');
//     clearTimeout(socket._connectTimer);

// });

// //when disconnected
// socket.on('disconnect', function () {

//     console.log('Disconnect from server')

// });

// socket._connectTimer = setTimeout(function () {

//     socket.close();
//     toast.error('Error connecting to server', {
//         position: "top-right",
//         autoClose: 8000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//     });

// }, 10000);

let firstTimeSub = 0;

const Maps = () => {

    const mainRef = useRef();

    const mapCenter = [-6.3616334, 106.8275797];
    const mapZoom = 15;

    const routeRef = useRef();
    const [route, setRoute] = useState(jalurMerah);
    const [halte, setHalte] = useState("merah");

    const [currentBus, setCurrentBus] = useState([]);

    //bus location
    const [theSocketMessage, setTheSocketMessage] = useState(null);

    const [client, setClient] = useState(null);
    const _topic = ["bikun"];
    const _options = {};

    useEffect(() => {

        _init();

        //Change displayed route
        if (routeRef.current) {

            routeRef.current.clearLayers();
            if (route != null) {

                routeRef.current.addData(route);
                if (route === jalurMerah) {

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

        checkBusTimeout();

    }, [route, routeRef, halte, currentBus]);


    const _init = () => {

        const c = mqtt.connect("mqtt.flespi.io", Number(80), "mqtt", _onConnectionLost, _onMessageArrived); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)
        setClient(c);

    }

    // called when client lost connection
    const _onConnectionLost = responseObject => {
        if (responseObject.errorCode !== 0) {

            console.log("onConnectionLost: " + responseObject.errorMessage);

        }

        console.log("connecting again");
        firstTimeSub = 0;
        _init();
    }

    // called when messages arrived
    const _onMessageArrived = message => {

        // var jsonMes = JSON.parse(message.payloadString);
        // var arrMes = Object.keys(message.payloadString);
        console.log("onMessageArrived(" + Date.now() + "): " + message.payloadString);

        parseIncomingMessage(message.payloadString);

    }



    // called when subscribing topic(s)
    const _onSubscribe = () => {
        client.connect({
            userName: "ryzDiqhw7pSOtWxB15MjrMn2StWFFF8U4ylaMruKGbmYVHpND1WUC9LkrvNU0MDS",
            useSSL: false,
            onSuccess: () => {
                for (var i = 0; i < _topic.length; i++) {
                    client.subscribe(_topic[i], _options);
                }
            }
        }); // called when the client connects

        firstTimeSub++;
    }

    //Websocket connection
    // socket.on('broadcast', (message) => {
    //     setTheSocketMessage(message.coordinate);
    // });

    // Parse the incoming message from IoT
    var parseIncomingMessage = (message) => {

        let splitMessage = message.split(";");
        let busId = splitMessage[0];
        let busStatus = splitMessage[1];
        let busColor = splitMessage[2] = '0' ? "merah" : "biru";
        let busLat = splitMessage[3];
        let busLong = splitMessage[4];

        let busData = JSON.parse('{ "id": ' + busId + ', "status": ' + busStatus + ', "color": "' + busColor + '", "coordinate": [' + busLat + ', ' + busLong + '], "lastUpdate": ' + Date.now() + '}');

        let busDataArray = currentBus;

        if (busDataArray.length > 0) {
            let idNotExist = 1;
            for (let i = 0; i < busDataArray.length; i++) {

                if (busDataArray[i].id == busData.id) {

                    busDataArray.splice(i, 1);
                    busDataArray.push(busData);
                    idNotExist = 0;
                    break;

                }
            }

            if (idNotExist == 1) {

                busDataArray.push(busData);

            }

        } else {

            busDataArray.push(busData);
        }

        setCurrentBus(busDataArray);

        checkBusTimeout();

        // setTheSocketMessage(JSON.parse(message.payloadString).coordinate);

    }

    // check if last time bus send data not more than 1 minute
    var checkBusTimeout = () => {

        let busDataArray = currentBus;

        // console.log("Arr: ")
        // console.log(busDataArray.length > 0 ? new Date(busDataArray[0].lastUpdate).getTime() : null);

        if (busDataArray.length > 0) {
            for (let i = 0; i <= busDataArray.length; i++) {


                if ((Date.now() - new Date(busDataArray[0].lastUpdate).getTime()) > 60000) {

                    busDataArray.splice(i, 1);

                }

            }

            setCurrentBus(busDataArray);

        }
    }

    var handleChangeRoute = (e) => {

        if (route === jalurMerah) {

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

        if (route === null) {

            setRoute(jalurMerah);

        } else {

            setRoute(null);

        }
    }

    var handleHalte = (e) => {

        if (halte === null) {

            if (route === jalurMerah) {

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

    const [ruteOpen, setRuteOpen] = useState(false);

    const handleInformasiRuteClose = () => {

        setRuteOpen(false);

    };

    const handleInformaiRute = () => {

        setRuteOpen(!ruteOpen);

    };

    //Leaflet Icons
    const redBus = L.icon({
        iconUrl: redBusIcon,
        iconSize: [32, 32],
        iconAnchor: [15, 20],
        popupAnchor: [4, -24],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    const blueBus = L.icon({
        iconUrl: blueBusIcon,
        iconSize: [32, 32],
        iconAnchor: [15, 20],
        popupAnchor: [4, -24],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    const busStopRed = L.icon({
        iconUrl: redStopIcon,
        iconSize: [35, 35],
        iconAnchor: [17, 30],
        popupAnchor: [2, -24],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    const busStopBlue = L.icon({
        iconUrl: blueStopIcon,
        iconSize: [35, 35],
        iconAnchor: [17, 30],
        popupAnchor: [2, -24],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    return (
        <>
            {console.log(currentBus)}
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
                            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                                Reset Tampilan
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'} 
                                                group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                onClick={handleInformaiRute}
                                            >
                                                <InfoOutlinedIcon />
                                                Tentang
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

                {halte === "merah" ?
                    halteMerah.map(lokasi => (

                        <Marker icon={busStopRed} position={[lokasi.coordinate[1], lokasi.coordinate[0]]}>
                            <Popup>
                                Halte <br></br>
                                {lokasi.namaHalte}
                            </Popup>
                        </Marker>

                    )) : halte === "biru" ?
                        halteBiru.map(lokasi => (

                            <Marker icon={busStopBlue} position={[lokasi.coordinate[1], lokasi.coordinate[0]]}>
                                <Popup>
                                    Halte <br></br>
                                    {lokasi.namaHalte}
                                </Popup>
                            </Marker>

                        )) : null
                }

                {theSocketMessage === null ? null :
                    theSocketMessage.map(busses => (
                        <Marker icon={busses.type === "merah" ? redBus : blueBus} position={busses.coordinate}>
                            <Popup>
                                {busses.type === "merah" ? "Bus jalur merah" : "Bus jalur biru"} <br></br>
                            </Popup>
                        </Marker>))}
            </MapContainer>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={ruteOpen}
                onClick={handleInformasiRuteClose}
            >

                <div className="flex h-2/3 items-center justify-center">
                    <div className="bg-white py-5 w-11/12 sm:w-3/5 md:w-3/6 lg:w-3/5 rounded-xl shadow-xl drop-shadow-sm">

                        <About />
                    </div>

                </div>


            </Backdrop>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            {client !== null ? firstTimeSub === 0 ? _onSubscribe() : null : null}
        </>
    )
}

export default Maps;