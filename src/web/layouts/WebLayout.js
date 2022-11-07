import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const WebLayout = () => {
    return (
        <>
            <Navbar />
            <div className="w-full w-[270px] md:w-[850px] mx-auto">
                <Outlet />
            </div>
        </>
    );
};

export default WebLayout;
