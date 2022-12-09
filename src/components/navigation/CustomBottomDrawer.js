import React, { useContext, useEffect, useMemo, useState } from "react";
import { CustomTabs } from "../elements";
import semuaHalte from "../../data/semuaHalte.json";
import { DataHalteDanJalur } from "../../data";

import halteBiru from "../../data/halteBiru.json";
import halteMerah from "../../data/halteMerah.json";

// context 
import { useBikunContext } from "../../provider/BikunContextProvider";

export const CustomBottomDrawer = (Refs) => {

  // mainRef
  const { mainRef } = Refs.props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectVal, SetSelectVal] = useState("");
  const [data, setData] = useState(useMemo(() => DataHalteDanJalur, []));
  const { choosenHalte, setChoosenHalte } = useBikunContext();

  const handleSelect = (halteValue) => {

    let notFound = 1;

    for (let i = 0; i < halteBiru.length; i++) {
      if (halteBiru[i].namaHalte == halteValue) {

        mainRef.current.setView([halteBiru[i].coordinate[1], halteBiru[i].coordinate[0]], 17);
        notFound = 0;
        break;

      }
    }

    if (notFound === 1) {

      for (let i = 0; i < halteBiru.length; i++) {
        if (halteMerah[i].namaHalte == halteValue) {

          mainRef.current.setView([halteMerah[i].coordinate[1], halteMerah[i].coordinate[0]], 17);
          break;

        }
      }
    }
    setChoosenHalte(halteValue);
  }

  return (
    <div className="rounded-t-[20px] flex flex-col gap-3 p-3 bg-primary-purple-heart absolute bottom-0 z-[4000] sm:w-[640px] w-full">
      <select
        className="w-full p-2 rounded-lg"
        onChange={(e) => {

          setIsOpen(true);
          SetSelectVal(e.target.value);
          handleSelect(e.target.value);

        }}
      >
        <option value="">Pilih Halte</option>
        {semuaHalte.map((halte) => (
          <option key={halte.value} value={halte.value}>
            Halte {halte.label}
          </option>
        ))}
      </select>
      {isOpen && selectVal && (
        <section>
          <CustomTabs data={data} isBikun={true} />
        </section>
      )}
    </div>
  );
};
