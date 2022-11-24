import Maps from "../components/maps/Maps";
import RouteInfo from "../components/info/RouteInfo";

// Components
import BottomDrawer from "../components/navigation/BottomDrawer";
import AppBar from '../components/navigation/AppBar';

const Dashboard = () => {

    return (
        <>
            <div className="flex flex-rows h-screen w-screen">
                <div className="lg:flex lg:w-1/3 hidden">
                    tes page
                </div>
                <div className="flex lg:w-1/3 w-screen justify-center">
                    <Maps />

                    <div className="absolute z-[1001] lg:w-1/3 sm:w-4/5 md:w-3/5 w-full">
                        <AppBar />
                    </div>

                    <div className="absolute z-[1001] lg:hidden  bottom-0 ">
                        <BottomDrawer />
                    </div>

                </div>
                <div className="lg:flex lg:w-1/3 h-screen w-screen hidden">
                    <RouteInfo />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
