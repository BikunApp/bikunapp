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
                <div className="flex lg:w-1/3 w-screen">
                    <Maps />

                    <div className="lg:hidden absolute z-[1001] w-full">
                        <AppBar />

                    </div>

                    <div className="lg:hidden absolute bottom-0 z-[2000]">
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
