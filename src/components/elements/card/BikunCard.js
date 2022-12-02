import React from "react";
import { BikunTag } from "../../elements";

export const BikunCard = () => {
  return (
    <div className="shadow-cardBikun rounded-lg w-[280px] min-h-[80px] flex justify-between gap-8 px-2 py-3">
      <section>
        <section className="flex gap-2 items-center">
          <img
            src={process.env.PUBLIC_URL + "/bikun-example.png"}
            alt="bikun"
          />
          <BikunTag type={"red"} />
        </section>
      </section>
      <section className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-poppins text-sm">6 mins</p>
          <p className="font-poppins text-gray text-poppins-p-small">12.34PM</p>
        </div>
        <p className="font-semibold text-gray text-poppins-p-small">
          Next <span className="">Halte FEB</span>
        </p>
      </section>
    </div>
  );
};
