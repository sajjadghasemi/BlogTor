import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { MdArrowBack } from "react-icons/md";

const WebLayout = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="w-full w-[270px] md:w-[850px] mx-auto">
                <Outlet />
            </div>
            <div
                onClick={() => navigate(-1)}
                className="fixed left-3 top-20 border-2 border-gray-700 rounded-full bg-gray-300 hover:bg-white"
                title="Back"
            >
                <MdArrowBack className="text-2xl md:text-5xl cursor-pointer text-gray-700" />
            </div>
        </>
    );
};

export default WebLayout;
