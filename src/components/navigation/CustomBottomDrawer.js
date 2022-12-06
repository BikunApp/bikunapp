import React, { useMemo, useState } from "react";
import { CustomTabs } from "../elements";
import semuaHalte from "../../data/semuaHalte.json";
import { DataHalteDanJalur } from "../../data";

export const CustomBottomDrawer = (Refs) => {

  let { mainRef, dataBikun, selectedHalte } = Refs.props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectVal, SetSelectVal] = useState("");
  const [data, setData] = useState(useMemo(() => DataHalteDanJalur, []));

  const handleSelect = (halteValue) => {

    selectedHalte.current = halteValue;

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
