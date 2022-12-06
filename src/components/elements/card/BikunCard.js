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
          <img
            src={process.env.PUBLIC_URL + "/bikun-example.png"}
            alt="bikun"
          />
          <section className="flex flex-col gap-1">
            <h4 className="text-poppins-h4 font-bold">{data?.namaBikun}</h4>
            <BikunTag type={data?.type} />
          </section>
        </section>
      </section>
      <section className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-poppins text-sm">{data?.detail?.eta} mins</p>
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
