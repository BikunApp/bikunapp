import ruteBikun from "../../assets/rute-bikun-only.png";

const RouteInfo = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="text-4xl font-poppins font-medium tracking-wide text-black">
          Bikun Route Info
        </p>
        <img alt="rute bikun" className="w-10/12" src={ruteBikun}></img>
      </div>
    </>
  );
};

export default RouteInfo;
