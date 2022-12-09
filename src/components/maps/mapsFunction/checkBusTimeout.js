// check if last time bus send data not more than 1 minute
export const checkBusTimeout = (currentBus) => {
    let busDataArray = currentBus;

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

        //setCurrentBus(busDataArray);
        return busDataArray;
    }
};