import React from "react";

export const BikunTag = ({ type }) => {
  const isBlue = type === "biru";
  return (
    <div
      className={`px-3 py-1 ${
        isBlue ? "bg-primary-malibu" : "bg-secondary-cerise text-white"
      } text-poppins-p rounded-lg w-max`}
    >
      {isBlue ? "Blue" : "Red"} line
    </div>
  );
};
