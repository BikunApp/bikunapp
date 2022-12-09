import axios from "axios";
import { postParseMessage } from "./parseIncomingMessage";

//Lokasi halte bikun
import halteMerah from "../../../data/halteMerah.json";
import halteBiru from "../../../data/halteBiru.json";

export const calculateETA = (coorString, choosenIndex, busData, choosenRoute, currentBus) => {

    console.log("enter calculateETA")

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
        if (ETAs < 10) {

            finalETA = "arriving";

        } else if (ETAs < 60) {

            finalETA = "< 1";

        } else {

            finalETA = Math.floor(ETAs / 60);

        }

        const dataETA = JSON.parse(

            '{"detail": {"eta": "' + finalETA + '", "nextHalte": "' + nextHalte + '"}}'

        )

        console.log(dataETA);

        busData = Object.assign(busData, dataETA);

        return postParseMessage(busData, currentBus);

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