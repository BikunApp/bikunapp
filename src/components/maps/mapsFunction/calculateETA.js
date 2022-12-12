import axios from "axios";
import { postParseMessage } from "./parseIncomingMessage";

//Lokasi halte bikun
import halteMerah from "../../../data/halteMerah.json";
import halteBiru from "../../../data/halteBiru.json";

export const calculateETA = async (coorString, choosenIndex, busData, choosenRoute, currentBus) => {

    console.log("enter calculateETA")

    const URI = process.env.REACT_APP_OSRM_ADDRESSES + "/table/v1/car/" + coorString + ".json";

    axios({

        method: "get",
        url: URI,
        responseType: "json",

    }).then(function (response) {

        let nextHalteETA = response.data.durations[0][1];
        let nextHalte;
        if (choosenRoute !== 0) {

            nextHalte = choosenRoute === 1 ? halteBiru[0].namaHalte : halteMerah[0].namaHalte;

        } else {

            nextHalte = halteBiru[0].namaHalte;

        }

        const bothHalte = Object.assign(halteBiru, halteMerah);

        for (let i = 1; i < response.data.durations[0].length - 1; i++) {

            if (nextHalteETA > response.data.durations[0][i]) {

                if (choosenRoute !== 0) {

                    nextHalte = choosenRoute === 1 ? halteBiru[i - 1].namaHalte : halteMerah[i - 1].namaHalte;

                } else {

                    nextHalte = bothHalte[i - 1].namaHalte;

                }
            }
        }

        let ETAs = response.data.durations[0][choosenIndex];

        let finalETA;
        if (ETAs < 10) {

            finalETA = "arriving";

        } else if (ETAs < 60) {

            finalETA = "<1";

        } else {

            finalETA = Math.floor(ETAs / 60);

        }

        const dataETA = JSON.parse(

            '{"detail": {"eta": "' + finalETA + '", "nextHalte": "' + nextHalte + '"}}'

        )

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
        console.log("error fetc data " + error)
        return (null);

    });
};