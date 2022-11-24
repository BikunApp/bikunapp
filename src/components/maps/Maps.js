import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

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

//GeoJSON rute bikun
import jalurMerah from '../../data/JalurBikunMerah.json';
import jalurBiru from '../../data/JalurBikunBiru.json';

//Lokasi halte bikun
import halteMerah from '../../data/halteMerah.json';
import halteBiru from '../../data/halteBiru.json';

import redBusIcon from '../../assets/icons/bus-icon-red.png';
import blueBusIcon from '../../assets/icons/bus-icon-blue.png';
import redStopIcon from '../../assets/icons/bus-stop-red.png';
import blueStopIcon from '../../assets/icons/bus-stop-blue.png';

import * as mqtt from 'react-paho-mqtt';
import axios from 'axios';

let firstTimeSub = 0;

const Maps = (props) => {

    let mainRef = props.props;

    const mapCenter = [-6.3594334, 106.8275797];
    const mapZoom = 15;

    const routeRef = useRef();
    const [route, setRoute] = useState(jalurMerah);
    const [halte, setHalte] = useState("merah");

    const [currentBus, setCurrentBus] = useState([]);

    //bus location
    // const [theSocketMessage, setTheSocketMessage] = useState(null);

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

    // Parse the incoming message from IoT
    var parseIncomingMessage = (message) => {

        let splitMessage = message.split(";");
        let busId = splitMessage[0];
        let busStatus = splitMessage[1];
        let busColor = splitMessage[2] == '0' ? "merah" : "biru";
        let busLat = splitMessage[3];
        let busLong = splitMessage[4];

        let busData = JSON.parse('{ "id": ' + busId + ', "status": ' + busStatus + ', "color": "' + busColor + '", "coordinate": [' + busLat + ', ' + busLong + '], "lastUpdate": ' + Date.now() + '}');

        let coorString = busLong + "," + busLat;
        for (let i = 0; i < halteBiru.length; i++) {

            coorString = coorString + ";" + halteBiru[i].coordinate[0] + "," + halteBiru[i].coordinate[1];

        }

        calculateETA(coorString);

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

    var calculateETA = (coorString) => {
        axios({

            method: 'get',
            url: 'https://router.project-osrm.org/table/v1/bike/' + coorString + '.json',
            responseType: 'json'

        }).then(function (response) {

            console.log(response.data);
            let nearest = response.data.durations[0][1];
            let theHalte;
            for (let i = 1; i < response.data.durations[0].length; i++) {

                if (nearest > response.data.durations[0][i]) {

                    theHalte = halteBiru[i - 1].namaHalte;
                    nearest = response.data.durations[0][i];

                }
            }

            console.log("halte" + theHalte + " dalam waktu " + nearest + " detik");

        })
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

    var handleMouseMove = () => {
        console.log("maps moved");
    }

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

            <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} zoomControl={false} onMouseMove={handleMouseMove} ref={mainRef}>

                <TileLayer
                    attribution='&copy; <a href="https://www.google.com/help/legalnotices_maps/">Google</a> Maps'
                    url="https://mt0.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
                // className='map-tiles'
                />

                {route === jalurMerah ?
                    <GeoJSON data={route} ref={routeRef} style={{ color: '#c424a3' }} /> :
                    <GeoJSON data={route} ref={routeRef} style={{ color: '#64e6fb' }} />}

                {halte === "merah" ?
                    halteMerah.map(lokasi => (
                        <>

                            <Marker icon={busStopRed} position={[lokasi.coordinate[1], lokasi.coordinate[0]]}>
                                <Popup>
                                    Halte <br></br>
                                    {lokasi.namaHalte}
                                </Popup>
                            </Marker>
                        </>

                    )) : halte === "biru" ?
                        halteBiru.map(lokasi => (
                            <>

                                <Marker icon={busStopBlue} position={[lokasi.coordinate[1], lokasi.coordinate[0]]}>
                                    <Popup>
                                        Halte <br></br>
                                        {lokasi.namaHalte}
                                    </Popup>
                                </Marker>
                            </>

                        )) : null
                }

                {currentBus === null ? null :
                    currentBus.map(busses => (
                        <Marker icon={busses.busColor === "merah" ? redBus : blueBus} position={busses.coordinate}>
                            <Popup>
                                {busses.busColor === "merah" ? "Bus jalur merah" : "Bus jalur biru"} <br></br>
                            </Popup>
                        </Marker>))}
            </MapContainer>

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