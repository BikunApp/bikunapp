import moment from "moment";
import React from "react";
import { BikunTag } from "../../elements";

export const BikunCard = ({ data }) => {
  const now = new Date();
  const eta = moment(now).add(data?.detail?.eta, "m").toDate();
  const hour = eta.getHours().toString();
  const minutes = eta.getMinutes().toString();
  const isPM = hour >= 12;

  return (
    <div className="bg-white shadow-cardBikun rounded-lg w-[280px] min-h-[80px] max-h-[12s0px] flex justify-between gap-8 px-2 py-3">
      <section>
        <section className="flex gap-2 items-center">
          <div
            className={`rounded-lg w-20 h-16 flex items-center justify-center text-white font-bold ${
              data?.type === "merah"
                ? "bg-secondary-cerise"
                : "bg-primary-malibu"
            }`}
          >
            {data?.namaBikun.split(" ")[data?.namaBikun.split(" ").length - 1]}
          </div>
          <section className="flex flex-col gap-1">
            <h4 className="text-poppins-h4 font-bold">{data?.namaBikun}</h4>
            <BikunTag type={data?.type} />
          </section>
        </section>
      </section>
      <section className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-poppins text-sm">
            {Number(data?.detail?.eta) === 0 ? (
              "arriving"
            ) : (
              <>{data?.detail?.eta} mins</>
            )}
          </p>
          <p className="font-poppins text-gray text-poppins-p-small">
            {hour}: {minutes} {isPM ? "PM" : "AM"}
          </p>
        </div>
        <p className="font-semibold text-gray text-poppins-p-small">
          Next <span className="">Halte {data?.detail?.nextHalte}</span>
        </p>
      </section>
    </div>
  );
};
