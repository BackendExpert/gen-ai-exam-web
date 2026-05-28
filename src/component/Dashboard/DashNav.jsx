import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
    HiOutlineBell,
    HiOutlineCog6Tooth,
    HiOutlineArrowRightOnRectangle,
    HiOutlineUserCircle,
    HiOutlineChevronDown,
} from "react-icons/hi2";
import UserImage from "../../assets/User.png";

const DashNav = () => {
    const { auth } = useAuth();

    const [open, setOpen] = useState(false);

    const panelRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, []);

    return (
        <div className="w-full px-8 py-5">

            <div className="flex items-center justify-between">

                <div className="xl:ml-0 ml-12">

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Dashboard
                    </h1>

                    <p className="text-sm text-gray-400 mt-1">
                        Welcome back
                        <span className="ml-2 font-semibold text-indigo-600">
                            {auth?.username}
                        </span>
                    </p>

                </div>

                <div className="flex items-center gap-7">

                    <button className="relative text-gray-500 hover:text-indigo-600 transition duration-300 hidden md:flex">

                        <HiOutlineBell size={24} />

                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full" />

                    </button>

                    <button className="text-gray-500 hover:text-indigo-600 transition duration-300 hidden md:flex">

                        <HiOutlineCog6Tooth size={24} />

                    </button>

                    <div
                        ref={panelRef}
                        className="relative"
                    >

                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-4"
                        >

                            <div className="text-right hidden sm:block">

                                <p className="text-sm font-semibold text-gray-900">
                                    {auth?.username}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    {auth?.role}
                                </p>

                            </div>

                            <img
                                src={UserImage}
                                alt="user"
                                className="w-11 h-11 rounded-2xl object-cover"
                            />

                            <HiOutlineChevronDown
                                size={18}
                                className={`text-gray-400 transition duration-500 ${open
                                        ? "rotate-180 text-indigo-600"
                                        : ""
                                    }`}
                            />

                        </button>

                        {open && (

                            <div className="absolute right-0 mt-5 w-80 bg-white rounded-3xl shadow-2xl p-6 z-50">

                                <div className="flex items-center gap-4 mb-6">

                                    <img
                                        src={UserImage}
                                        alt="user"
                                        className="w-14 h-14 rounded-2xl object-cover"
                                    />

                                    <div>

                                        <p className="font-semibold text-gray-900">
                                            {auth?.username}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-1">
                                            {auth?.email}
                                        </p>

                                        <p className="text-xs text-indigo-600 mt-1">
                                            {auth?.role}
                                        </p>

                                    </div>

                                </div>

                                <div className="space-y-1">

                                    <a href="/dashboard/profile">

                                        <button className="w-full flex items-center gap-4 py-3 text-left text-gray-600 hover:text-indigo-600 transition">

                                            <HiOutlineUserCircle size={22} />

                                            <span className="text-sm font-medium">
                                                My Profile
                                            </span>

                                        </button>

                                    </a>

                                    <a href="/dashboard/settings">

                                        <button className="w-full flex items-center gap-4 py-3 text-left text-gray-600 hover:text-indigo-600 transition">

                                            <HiOutlineCog6Tooth size={22} />

                                            <span className="text-sm font-medium">
                                                Settings
                                            </span>

                                        </button>

                                    </a>

                                    <button className="w-full flex items-center gap-4 py-3 text-left text-gray-600 hover:text-red-500 transition">

                                        <HiOutlineArrowRightOnRectangle size={22} />

                                        <span className="text-sm font-medium">
                                            Logout
                                        </span>

                                    </button>

                                </div>

                                <p className="text-center text-[11px] text-gray-300 mt-5">
                                    MHMS Enterprise
                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default DashNav;