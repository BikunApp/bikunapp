import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as mqtt from "react-paho-mqtt";

// Maps Function
import {

  parseIncomingMessage,
  generateRandomString

} from "./mapsFunction";

import "./Maps.css";
import "react-toastify/dist/ReactToastify.css";

//Leaflet maps
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";

//GeoJSON rute bikun
import jalurMerah from "../../data/JalurBikunMerah.json";
import jalurBiru from "../../data/JalurBikunBiru.json";

//Lokasi halte bikun
import halteMerah from "../../data/halteMerah.json";
import halteBiru from "../../data/halteBiru.json";

// context
import { useBikunContext } from "../../provider/BikunContextProvider";

// leaflet icons
import { redBus, blueBus, busStopRed, busStopBlue } from "./leafletIcons";

let choosenRoute = 0;
let choosenStop = "";

const Maps = (Refs) => {

  let { mainRef } = Refs.props;

  const mapCenter = [-6.3594334, 106.8275797];
  const mapZoom = 15;

  const routeRef = useRef();
  const [route, setRoute] = useState(jalurMerah);
  const [halte, setHalte] = useState("merah");

  const [currentBus, setCurrentBus] = useState([]);

  const [client, setClient] = useState(null);
  const _topic = [process.env.REACT_APP_MQTT_TOPIC];
  const _options = {};

  const { dataBikun, setDataBikun } = useBikunContext();
  const { choosenHalte, setChoosenHalte } = useBikunContext();
  const { choosenJalur, setChoosenJalur } = useBikunContext();

  useEffect(() => {

    _init();

  }, []);

  useEffect(() => {

    if (client !== null) {

      _onSubscribe();

    }
  }, [client]);

  useEffect(() => {

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
  }, [route, routeRef, halte]);

  useEffect(() => {

    choosenRoute = choosenJalur;
    choosenStop = choosenHalte;

  }, [choosenHalte, choosenJalur, currentBus, dataBikun]);

  const _init = () => {

    const c = mqtt.connect(
      process.env.REACT_APP_MQTT_ADDRESS,       // mqtt broker address
      Number(process.env.REACT_APP_MQTT_PORT),  // mqtt broker port
      generateRandomString(),                   // client id
      _onConnectionLost,                        // connection lost callback
      _onMessageArrived                         // message arrived callback
    ); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)

    setClient(c);

  };

  // called when client lost connection
  const _onConnectionLost = (responseObject) => {

    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);

      toast.error('Connection lost, please check your internet connection.', {

        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",

      });
    }

    console.log("reconnecting...");
  };

  // called when messages arrived
  const _onMessageArrived = (message) => {
    // var jsonMes = JSON.parse(message.payloadString);
    // var arrMes = Object.keys(message.payloadString);
    console.log(
      "onMessageArrived(" + Date.now() + "): " + message.payloadString
    );

    const parsedMessage = parseIncomingMessage(message.payloadString, choosenStop, choosenRoute, currentBus);
    console.log(parsedMessage);
    console.log(currentBus);

    setCurrentBus([...currentBus]);

  };

  // called when subscribing topic(s)
  const _onSubscribe = () => {

    console.log(client.clientId);
    client.connect({
      userName: process.env.REACT_APP_MQTT_USERNAME,
      useSSL: Boolean(Number(process.env.REACT_APP_MQTT_SSL)),
      reconnect: true,
      onSuccess: () => {
        for (var i = 0; i < _topic.length; i++) {
          client.subscribe(_topic[i], _options);
        }
      },
    }); // called when the client connects
  };

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
  };

  var handleRoute = (e) => {
    if (route === null) {
      setRoute(jalurMerah);
    } else {
      setRoute(null);
    }
  };

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
  };

  return (
    <>
      {console.log(currentBus)}
      {console.log("Halte biru + merah" + halteMerah + halteBiru)}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        zoomControl={false}
        ref={mainRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.google.com/help/legalnotices_maps/">Google</a> Maps'
          url="https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        // className='map-tiles'
        />

        {route === jalurMerah ? (
          <GeoJSON data={route} ref={routeRef} style={{ color: "#c424a3" }} />
        ) : (
          <GeoJSON data={route} ref={routeRef} style={{ color: "#64e6fb" }} />
        )}

        {halte === "merah"
          ? halteMerah.map((lokasi) => (
            <Marker
              icon={busStopRed}
              position={[lokasi.coordinate[1], lokasi.coordinate[0]]}
              key={lokasi.namaHalte}
            >
              <Popup>
                Halte <br></br>
                {lokasi.namaHalte}
              </Popup>
            </Marker>
          ))
          : halte === "biru"
            ? halteBiru.map((lokasi) => (
              <Marker
                icon={busStopBlue}
                position={[lokasi.coordinate[1], lokasi.coordinate[0]]}
                key={lokasi.namaHalte}
              >
                <Popup>
                  Halte <br></br>
                  {lokasi.namaHalte}
                </Popup>
              </Marker>
            ))
            : null}

        {currentBus === null
          ? null
          : currentBus.map((busses) => (
            <Marker
              icon={busses.type === "merah" ? redBus : blueBus}
              position={busses.coordinate}
              key={busses.coordinate}
            >
              <Popup>
                {busses.type === "merah"
                  ? "Bus jalur merah"
                  : "Bus jalur biru"}{" "}
                <br></br>
              </Popup>
            </Marker>
          ))}
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

      {/* {client !== null ? (firstTimeSub === 0 ? _onSubscribe() : null) : null} */}
    </>
  );
};

export default Maps;