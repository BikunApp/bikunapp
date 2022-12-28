import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as mqtt from "react-paho-mqtt";

// Maps Function
import { generateRandomString, parseIncomingMessage } from "./mapsFunction";

import "./Maps.css";
import "react-toastify/dist/ReactToastify.css";

//Leaflet maps
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";

// leaflet icons
import { redBus, blueBus, busStopRed, busStopBlue } from "./leafletIcons";

//GeoJSON rute bikun
import jalurMerah from "../../data/JalurBikunMerah.json";
import jalurBiru from "../../data/JalurBikunBiru.json";

//Lokasi halte bikun
import halteMerah from "../../data/halteMerah.json";
import halteBiru from "../../data/halteBiru.json";

// context
import { useBikunContext } from "../../provider/BikunContextProvider";
import { useStateWithCallbackLazy } from "use-state-with-callback";

let choosenRoute = 0;
let choosenStop = "";
let halteSkrg = "";
let dataBikunRil = [];

const Maps = (Refs) => {
  let { mainRef } = Refs.props;

  const mapCenter = [-6.3594334, 106.8275797];
  const mapZoom = 15;

  const routeRef = useRef();
  const routeRefRed = useRef();
  const routeRefBlue = useRef();

  const [route, setRoute] = useState(jalurMerah);
  const [halte, setHalte] = useState("merah");

  const [currentBus, setCurrentBus] = useState([]);
  // const [choosenRoute, setChoosenRoute] = useState(0);
  // const [choosenStop, setChoosenStop] = useState("");

  const [client, setClient] = useState(null);
  const _topic = [process.env.REACT_APP_MQTT_TOPIC];
  const _options = {};

  const { dataBikun, setDataBikun, choosenHalte, choosenJalur } =
    useBikunContext();

  const [halteSekarang, setHalteSekarang] =
    useStateWithCallbackLazy(choosenHalte);

  useEffect(() => {
    _init();
  }, []);

  useEffect(() => {
    if (client !== null) {
      _onSubscribe();
    }
  }, [client]);

  useEffect(() => {
    // setChoosenRoute(choosenJalur);
    // setChoosenStop(choosenHalte);

    choosenRoute = choosenJalur;
    choosenStop = choosenHalte;
    halteSkrg = halteSekarang;

    // console.log(choosenRoute);
    // console.log(choosenStop);

    //Change displayed route
    if (routeRef.current) {
      if (route != null) {
        if (choosenRoute !== 0 || choosenRoute !== "") {
          routeRef.current.clearLayers();
          routeRef.current.addData(route);

          if (choosenRoute === 2) {
            routeRef.current.setStyle({ color: "#c424a3" });
          } else if (choosenRoute === 1) {
            routeRef.current.setStyle({ color: "#64e6fb" });
          }
        }
      }
    }

    if (halte !== null) {
      if (choosenRoute === 2) {
        setHalte("merah");
        setRoute(jalurMerah);
      } else if (choosenRoute === 1) {
        setHalte("biru");
        setRoute(jalurBiru);
      } else {
        setRoute(null);
      }
    }
  }, [route, routeRef, halte, choosenJalur, choosenHalte]);

  const _init = () => {
    const c = mqtt.connect(
      process.env.REACT_APP_MQTT_ADDRESS, // mqtt broker address
      Number(process.env.REACT_APP_MQTT_PORT), // mqtt broker port
      generateRandomString(), // client id
      _onConnectionLost, // connection lost callback
      _onMessageArrived // message arrived callback
    ); // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)

    setClient(c);
  };

  // called when client lost connection
  const _onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);

      toast.error("Connection lost, please check your internet connection.", {
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
  const _onMessageArrived = async (message) => {
    // var jsonMes = JSON.parse(message.payloadString);
    // var arrMes = Object.keys(message.payloadString);
    // console.log(
    //   "onMessageArrived(" + Date.now() + "): " + message.payloadString
    // );

    awaitParseMessage(message);
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

  const awaitParseMessage = (message) => {
    // run when halte changes, empty the bikun then fill again with new data
    if (halteSkrg !== choosenStop) {
      console.log("Masuk");
      halteSkrg = choosenStop;
      setHalteSekarang(choosenStop, (stop) => {
        console.log(`halte skrg after: ${stop}`);
        setDataBikun(
          (prev) => prev.splice(),
          (curr) => {
            // console.log(curr);
            dataBikunRil = curr;
            parseIncomingMessage(
              message.payloadString,
              choosenStop,
              choosenRoute,
              curr
            ).then((result) => {
              console.log(result);
              // console.log("print once");

              setCurrentBus([...result]);
              setDataBikun([...result]);
            });
          }
        );
      });
    } else {
      console.log("Masuk 2");
      setDataBikun(
        (prev) => [...prev],
        (curr) => {
          // console.log(curr);
          parseIncomingMessage(
            message.payloadString,
            choosenStop,
            choosenRoute,
            curr
          ).then((result) => {
            console.log(result);
            // console.log("print once");

            setCurrentBus([...result]);
            setDataBikun([...result]);
          });
        }
      );
    }

    // to do: add condition to empty the bikun only when halte state changes
  };

  return (
    <>
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

        {choosenRoute === 0 || choosenRoute === "" ? (
          <>
            <GeoJSON
              data={jalurMerah}
              ref={routeRefRed}
              style={{ color: "#c424a3" }}
            />
            <GeoJSON
              data={jalurBiru}
              ref={routeRefBlue}
              style={{ color: "#64e6fb" }}
            />
          </>
        ) : (
          <GeoJSON
            data={route}
            ref={routeRef}
            style={
              choosenRoute === 2 ? { color: "#c424a3" } : { color: "#64e6fb" }
            }
          />
        )}

        {halte === "merah"
          ? halteMerah.map((lokasi, index) => (
              <Marker
                icon={busStopRed}
                position={[lokasi.coordinate[1], lokasi.coordinate[0]]}
                key={index}
              >
                <Popup>
                  Halte <br></br>
                  {lokasi.namaHalte}
                </Popup>
              </Marker>
            ))
          : halte === "biru"
          ? halteBiru.map((lokasi, index) => (
              <Marker
                icon={busStopBlue}
                position={[lokasi.coordinate[1], lokasi.coordinate[0]]}
                key={index}
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
          : currentBus.map((busses, index) => (
              <Marker
                icon={busses.type === "merah" ? redBus : blueBus}
                position={busses.coordinate}
                key={index}
              >
                <Popup>
                  {"Bikun " + busses.type + " " + busses.id} <br></br>
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
