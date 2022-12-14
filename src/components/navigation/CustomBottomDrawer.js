import React, { useEffect, useState } from "react";
import { CustomTabs } from "../elements";
import semuaHalte from "../../data/semuaHalte.json";

import halteBiru from "../../data/halteBiru.json";
import halteMerah from "../../data/halteMerah.json";

// context
import { useBikunContext } from "../../provider/BikunContextProvider";

//let data = [];
export const CustomBottomDrawer = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectVal, SetSelectVal] = useState("");
  //const [data] = useState(useMemo(() => DataHalteDanJalur, []));
  const [data, setData] = useState([]);
  const { dataBikun, updateChoosenHalte } = useBikunContext();

  useEffect(() => {
    setData([
      {
        label: "Both",
        content: dataBikun.sort((a, b) =>
          Number(a.detail.eta) > Number(b.detail.eta) ? 1 : -1
        ),
      },
      {
        label: "Blue Line",
        content: dataBikun
          .filter(
            (d) =>
              d?.detail?.eta !== "" &&
              d?.detail?.eta !== "NaN" &&
              d?.type === "biru"
          )
          .sort((a, b) =>
            Number(a.detail.eta) > Number(b.detail.eta) ? 1 : -1
          ),
      },
      {
        label: "Red Line",
        content: dataBikun
          .filter(
            (d) =>
              d?.detail?.eta !== "" &&
              d?.detail?.eta !== "NaN" &&
              d?.type === "merah"
          )
          .sort((a, b) =>
            Number(a.detail.eta) > Number(b.detail.eta) ? 1 : -1
          ),
      },
    ]);
  }, [dataBikun]);

  const handleSelect = (halteValue) => {
    if (halteValue === "") {
      // center the map
      props.props.mainRef.current.setView([-6.3594334, 106.8275797], 15);
    } else {
      props.props.mainRef.current.setView([-6.3594334, 106.8275797], 15);
      setTimeout(() => {
        let notFound = true;

        for (let i = 0; i < halteBiru.length; i++) {
          if (halteBiru[i].namaHalte === halteValue) {
            props.props.mainRef.current.setView(
              [halteBiru[i].coordinate[1], halteBiru[i].coordinate[0]],
              20
            );
            notFound = false;
            break;
          }
        }

        if (notFound) {
          for (let i = 0; i < halteMerah.length; i++) {
            if (halteMerah[i].namaHalte === halteValue) {
              props.props.mainRef.current.setView(
                [halteMerah[i].coordinate[1], halteMerah[i].coordinate[0]],
                20
              );
              notFound = false;
              break;
            }
          }
        }
      }, 500);
    }
    updateChoosenHalte(halteValue);
  };

  return (
    <div className="rounded-t-[20px] flex flex-col gap-3 p-3 bg-primary-purple-heart fixed bottom-0 z-[4000] sm:w-[640px] w-full">
      <select
        className="w-full p-2 rounded-lg"
        onChange={(e) => {
          setIsOpen(true);
          SetSelectVal(e.target.value);
          handleSelect(e.target.value);
        }}
      >
        <option value="">Pilih Halte</option>
        {semuaHalte.map((halte, index) => (
          <option key={index} value={halte.value}>
            Halte {halte.label}
          </option>
        ))}
      </select>
      {isOpen && selectVal && (
        <section>
          <CustomTabs
            mainRef={props.props.mainRef}
            data={data}
            isBikun={true}
          />
        </section>
      )}
    </div>
  );
};
