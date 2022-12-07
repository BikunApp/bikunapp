import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./Maps.css";
import "react-toastify/dist/ReactToastify.css";

//Leaflet maps
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";

//GeoJSON rute bikun
import jalurMerah from "../../data/JalurBikunMerah.json";
import jalurBiru from "../../data/JalurBikunBiru.json";

//Lokasi halte bikun
import halteMerah from "../../data/halteMerah.json";
import halteBiru from "../../data/halteBiru.json";

import redBusIcon from "../../assets/icons/bus-icon-red.png";
import blueBusIcon from "../../assets/icons/bus-icon-blue.png";
import redStopIcon from "../../assets/icons/bus-stop-red.png";
import blueStopIcon from "../../assets/icons/bus-stop-blue.png";

import * as mqtt from "react-paho-mqtt";
import axios from "axios";

// context
import { useBikunContext } from "../../provider/BikunContextProvider";
import { FloodRounded } from "@mui/icons-material";

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
      Math.random().toString(16).substr(2, 14), // client id
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

    parseIncomingMessage(message.payloadString);
  };

  // called when subscribing topic(s)
  const _onSubscribe = () => {

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

  // Parse the incoming message from IoT
  var parseIncomingMessage = (message) => {

    let splitMessage = message.split(";");
    let busId = splitMessage[0];
    let busStatus = splitMessage[1];
    let busColor = splitMessage[2] == "0" ? "merah" : "biru";
    let busLat = splitMessage[3];
    let busLong = splitMessage[4];

    if (busLat === "" || busLong === "") {

      return;

    }

    let busData;
    busData = JSON.parse(
      '{ "id": ' + busId +
      ', "namaBikun": "Bikun ' + busColor + ' ' + busId +
      '", "status": ' + busStatus +
      ', "type": "' + busColor +
      '", "coordinate": [' + busLat + ", " + busLong +
      '], "lastUpdate": ' + Date.now() +
      "}"
    );

    if (choosenStop !== "") {

      let coorString = busLong + "," + busLat;
      let choosenIndex;

      if (choosenRoute === 1) {
        for (let i = 0; i < halteBiru.length; i++) {
          if (choosenStop == halteBiru[i].namaHalte) {

            choosenIndex = i;

          }
          coorString =
            coorString +
            ";" +
            halteBiru[i].coordinate[0] +
            "," +
            halteBiru[i].coordinate[1];

        }
      } else if (choosenRoute === 2) {

        for (let i = 0; i < halteMerah.length; i++) {
          if (choosenStop == halteMerah[i].namaHalte) {

            choosenIndex = i;

          }
          coorString =
            coorString +
            ";" +
            halteMerah[i].coordinate[0] +
            "," +
            halteMerah[i].coordinate[1];

        }
      } else {

        for (let i = 0; i < halteBiru.length; i++) {
          if (choosenStop == halteBiru[i].namaHalte) {

            choosenIndex = i;

          }
          coorString =
            coorString +
            ";" +
            halteBiru[i].coordinate[0] +
            "," +
            halteBiru[i].coordinate[1];

        }
        for (let i = 0; i < halteMerah.length; i++) {
          if (choosenStop == halteMerah[i].namaHalte) {

            choosenIndex = i;

          }
          coorString =
            coorString +
            ";" +
            halteMerah[i].coordinate[0] +
            "," +
            halteMerah[i].coordinate[1];

        }
      }

      calculateETA(coorString, choosenIndex, busData);

      return;
    }

    postParseMessage(busData);

  };

  const postParseMessage = (busData) => {

    let busDataArray = currentBus;

    if (busDataArray.length > 0) {
      let idNotExist = 1;
      for (let i = 0; i < busDataArray.length; i++) {
        if (busDataArray[i].id === busData.id) {

          busDataArray.splice(i, 1);
          busDataArray.push(busData);
          idNotExist = 0;
          break;

        }
      }

      if (idNotExist == 1) {

        busDataArray.unshift(busData);

      }
    } else {

      busDataArray.unshift(busData);

    }

    setCurrentBus(busDataArray);
    setDataBikun(busDataArray);

  }

  var calculateETA = (coorString, choosenIndex, busData) => {

    const URI = process.env.REACT_APP_OSRM_ADDRESSES + "/table/v1/car/" + coorString + ".json";

    axios({

      method: "get",
      url: URI,
      responseType: "json",

    }).then(function (response) {

      console.log(response.data);
      let nextHalteETA = response.data.durations[0][1];
      let nextHalte = choosenRoute === 1 ? halteBiru[1].namaHalte : halteMerah[1].namaHalte;

      for (let i = 1; i < response.data.durations[0].length; i++) {

        if (nextHalteETA > response.data.durations[0][i]) {

          nextHalte = choosenRoute === 1 ? halteBiru[i - 1].namaHalte : halteMerah[i - 1].namaHalte;

        }
      }

      let ETAs = response.data.durations[0][choosenIndex];
      console.log(ETAs);

      let finalETA;
      if (ETAs < 60) {

        finalETA = "< 1";

      } else if (ETAs < 10) {

        finalETA = "arriving";

      } else {

        finalETA = Math.floor(ETAs / 60);

      }

      const dataETA = JSON.parse(

        '{"detail": {"eta": "' + finalETA + '", "nextHalte": "' + nextHalte + '"}}'

      )

      console.log(dataETA);

      busData = Object.assign(busData, dataETA);

      postParseMessage(busData);

      // let busDataArray = [...currentBus];

      // if (busDataArray.length > 0) {
      //   let idNotExist = 1;
      //   for (let i = 0; i < busDataArray.length; i++) {
      //     if (busDataArray[i].id === busData.id) {

      //       busDataArray.splice(i, 1);
      //       busDataArray.push(busData);
      //       idNotExist = 0;
      //       break;

      //     }
      //   }

      //   if (idNotExist == 1) {

      //     busDataArray.push(busData);

      //   }
      // } else {

      //   busDataArray.push(busData);

      // }

      // setCurrentBus(busDataArray);
      // setDataBikun(busDataArray);

    }).catch(function (error) {

      return (null);

    });
  };

  // check if last time bus send data not more than 1 minute
  var checkBusTimeout = () => {
    let busDataArray = [...currentBus];

    // console.log("Arr: ")
    // console.log(busDataArray.length > 0 ? new Date(busDataArray[0].lastUpdate).getTime() : null);

    if (busDataArray.length > 0) {
      for (let i = 0; i <= busDataArray.length; i++) {
        if (
          Date.now() - new Date(busDataArray[0].lastUpdate).getTime() >
          60000
        ) {
          busDataArray.splice(i, 1);
        }
      }

      setCurrentBus(busDataArray);
    }
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

  //Leaflet Icons
  const redBus = L.icon({
    iconUrl: redBusIcon,
    iconSize: [32, 32],
    iconAnchor: [15, 20],
    popupAnchor: [4, -24],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  const blueBus = L.icon({
    iconUrl: blueBusIcon,
    iconSize: [32, 32],
    iconAnchor: [15, 20],
    popupAnchor: [4, -24],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  const busStopRed = L.icon({
    iconUrl: redStopIcon,
    iconSize: [35, 35],
    iconAnchor: [17, 30],
    popupAnchor: [2, -24],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  const busStopBlue = L.icon({
    iconUrl: blueStopIcon,
    iconSize: [35, 35],
    iconAnchor: [17, 30],
    popupAnchor: [2, -24],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  return (
    <>
      {console.log(currentBus)}
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
