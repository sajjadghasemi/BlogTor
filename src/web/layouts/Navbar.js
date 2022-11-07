import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import { FaTimes } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { MdTravelExplore } from "react-icons/md";
import { SiBloglovin } from "react-icons/si";
import { Cookies } from "react-cookie";
import axios from "axios";
import LoadingLayout from "./LoadingLayout";
import { BsPlusLg } from "react-icons/bs";

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const [menu, setMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");

    const cookies = new Cookies();
    const myCookie = cookies.get("token");

    const handleDropdown = () => {
        setDropdown(!dropdown);
    };

    const clickDropdownBody = () => {
        setDropdown(!dropdown);
    };

    const handleMenu = () => {
        setMenu(!menu);
    };

    const clickMenuBody = () => {
        setMenu(!menu);
    };

    const backdrop = () => {
        setMenu(false);
    };

    const handleLogout = () => {
        cookies.remove("token");
    };

    useEffect(() => {
        axios({
            method: "post",
            url: "http://localhost:4000/user/me",
            headers: {
                auth: `ut ${myCookie}`,
            },
        })
            .then(function (response) {
                setUser(response.data);
            })
            .catch(function (error) {
                console.log("lol");
            });
        setLoading(true);
    }, []);

    if (!loading) return <LoadingLayout />;

    return (
        <div>
            {menu && (
                <div
                    onClick={backdrop}
                    className="fixed z-20 w-full h-full bg-black opacity-50 md:hidden shadow-2xl"
                ></div>
            )}
            <div
                onClick={clickMenuBody}
                className={
                    menu
                        ? "block fixed h-full z-40 md:hidden"
                        : "hidden md:hidden"
                }
            >
                <div className="w-[220px] bg-gray-800 h-full">
                    <div className="flex justify-between">
                        <span
                            to=""
                            className="block py-2 px-4 text-md text-gray-100 mt-2"
                        >
                            Menu
                        </span>
                        <button
                            onClick={handleMenu}
                            className="flex rounded p-2 text-gray-100 text-[1.75rem] mt-2"
                        >
                            <FaTimes className="text-red-400" />
                        </button>
                    </div>
                    <ul className="mt-2">
                        <li>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "block px-2 text-sm bg-gray-700"
                                        : undefined
                                }
                                to=""
                                end
                            >
                                <span className="block py-2 px-4 text-sm text-gray-400 hover:bg-gray-700">
                                    Home
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="top-writers"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block px-2 bg-gray-700"
                                        : undefined
                                }
                            >
                                <span className="block py-2 px-4 text-sm text-gray-400 hover:bg-gray-700">
                                    Top Writers
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="explore"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block px-2 text-sm bg-gray-700"
                                        : undefined
                                }
                            >
                                <span className="block py-2 px-4 text-sm text-gray-400 hover:bg-gray-700">
                                    Explore
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <nav className="w-full bg-gray-700 text-[#c4c4c4] px-3 py-4 fixed top-0 sticky">
                <div className="flex justify-between">
                    <div className="ml-3 text-md md:text-[2rem]">
                        <Link to="/" className="hover:text-white">
                            <SiBloglovin />
                        </Link>
                    </div>
                    <div className="hidden md:block text-md md:text-xl">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-gray-600 text-white pt-3 pb-2 rounded mx-0 transition-all"
                                    : undefined
                            }
                            to=""
                            end
                        >
                            <span className="px-3 text-[1.5rem] hover:text-white inline-block">
                                <AiFillHome />
                            </span>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-gray-600 text-white pt-3 pb-2 rounded mx-0 transition-all"
                                    : undefined
                            }
                            to="top-writers"
                        >
                            <span className="px-3 text-[1.5rem] hover:text-white inline-block">
                                <MdOutlineSpeakerNotes />
                            </span>
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-gray-600 text-white pt-3 pb-2 rounded mx-0 transition-all"
                                    : undefined
                            }
                            to="explore"
                        >
                            <span className="px-3 text-[1.5rem] hover:text-white inline-block">
                                <MdTravelExplore />
                            </span>
                        </NavLink>
                        {myCookie && (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "bg-gray-600 text-white pt-3 pb-1 rounded mx-0 transition-all"
                                        : undefined
                                }
                                to={`${user.username}/new-post`}
                            >
                                <span className="px-3 text-[1.5rem] hover:text-white inline-block">
                                    <BsPlusLg title="Create New Post" />
                                </span>
                            </NavLink>
                        )}
                    </div>
                    <div className="text-md md:text-xl flex">
                        {!myCookie ? (
                            <Link to="sign">
                                <span className="bg-white text-[.6rem] md:text-sm border-2 border-[#d8d6d0] text-gray-800 px-3 py-2 rounded hover:bg-[#d8d6d0] hover:text-gray-700 hover:border-2 hover:border-white duration-200">
                                    Sign in | Sign Up
                                </span>
                            </Link>
                        ) : (
                            <div className="flex flex-col">
                                {" "}
                                <button
                                    onClick={handleDropdown}
                                    className="flex ml-3 text-sm bg-gray-200 rounded-full focus:ring-4 focus:ring-white"
                                >
                                    <img
                                        className="w-7 h-7 rounded-full"
                                        src={
                                            user.avatar
                                                ? `http://localhost:4000/${user.avatar}`
                                                : "/userAvatar.png"
                                        }
                                        alt="user photo"
                                    />
                                </button>
                                {dropdown && (
                                    <div
                                        onClick={clickDropdownBody}
                                        className="fixed right-1 top-10 my-2 bg-gray-900 rounded divide-y divide-gray-300 shadow"
                                    >
                                        <div className="py-3 px-4">
                                            <span className="block text-sm text-gray-400">
                                                {user.name}
                                            </span>
                                        </div>
                                        <ul>
                                            <li>
                                                <Link
                                                    to={user.username}
                                                    className="block py-2 px-4 text-sm text-gray-100 hover:bg-gray-700"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={`${user.username}/edit`}
                                                    className="block py-2 px-4 text-sm text-gray-100 hover:bg-gray-700"
                                                >
                                                    Edit Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    onClick={handleLogout}
                                                    to=""
                                                    className="block py-2 px-4 text-sm text-gray-100 hover:bg-gray-700"
                                                >
                                                    Sign out
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="md:hidden flex">
                            <button
                                onClick={handleMenu}
                                className="flex rounded ml-3 text-gray-100 text-[1.75rem] focus:ring-2 focus:ring-white"
                            >
                                {menu ? <FaTimes /> : <CgMenuRightAlt />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
