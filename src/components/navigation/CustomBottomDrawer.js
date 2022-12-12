import React, { useMemo, useState } from "react";
import { CustomTabs } from "../elements";
import semuaHalte from "../../data/semuaHalte.json";
import { DataHalteDanJalur } from "../../data";

import halteBiru from "../../data/halteBiru.json";
import halteMerah from "../../data/halteMerah.json";

// context
import { useBikunContext } from "../../provider/BikunContextProvider";

export const CustomBottomDrawer = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectVal, SetSelectVal] = useState("");
  const [data] = useState(useMemo(() => DataHalteDanJalur, []));
  const { setChoosenHalte } = useBikunContext();

  const handleSelect = (halteValue) => {
    if (halteValue === "") {
      props.props.mainRef.current.setView([-6.3594334, 106.8275797], 15);
    } else {
      let notFound = true;
      for (let i = 0; i < halteBiru.length; i++) {
        if (halteBiru[i].namaHalte === halteValue) {
          props.props.mainRef.current.setView(
            [halteBiru[i].coordinate[1], halteBiru[i].coordinate[0]],
            17
          );
          notFound = false;
          break;
        }
      }

      if (notFound) {
        for (let i = 0; i < halteBiru.length; i++) {
          if (halteMerah[i].namaHalte === halteValue) {
            props.props.mainRef.current.setView(
              [halteMerah[i].coordinate[1], halteMerah[i].coordinate[0]],
              17
            );
            notFound = false;
            break;
          }
        }
      }
    }
    setChoosenHalte(halteValue);
  };

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
