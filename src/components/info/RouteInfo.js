import ruteBikun from "../../assets/rute-bikun-only.png";

const RouteInfo = () => {


    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <p className="text-4xl font-sans font-medium tracking-wide text-black">Rute Bikun UI</p>
                <img className="w-10/12" src={ruteBikun}></img>
            </div>
        </>
    );
};

export default RouteInfo;
