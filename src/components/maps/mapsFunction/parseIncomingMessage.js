import { calculateETA } from "./calculateETA";

//Lokasi halte bikun
import halteMerah from "../../../data/halteMerah.json";
import halteBiru from "../../../data/halteBiru.json";

export const parseIncomingMessage = async (
  message,
  choosenStop,
  choosenRoute,
  currentBus
) => {
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
    '{ "id": ' +
      busId +
      ', "namaBikun": "Bikun ' +
      busColor +
      " " +
      busId +
      '", "status": ' +
      busStatus +
      ', "type": "' +
      busColor +
      '", "coordinate": [' +
      busLat +
      ", " +
      busLong +
      '], "lastUpdate": ' +
      Date.now() +
      "}"
  );

  // console.log(choosenStop);

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

    await calculateETA(
      coorString,
      choosenIndex,
      busData,
      choosenRoute,
      currentBus
    ).then(function (response) {
      return currentBus;
    });
  }

  return await postParseMessage(busData, currentBus);
};

export const postParseMessage = async (busData, currentBus) => {
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
  // console.log(busDataArray);

  return busDataArray;
};
