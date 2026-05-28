import React, { useEffect, useRef, useState } from "react";
import {
    Activity,
    Shield,
    Factory,
    Cpu,
    Radar,
    Wrench,
    BellRing,
    Users,
    Settings,
    ChevronDown,
    ChevronRight,
    Hexagon,
} from "lucide-react";

import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashSide = () => {
    const { auth } = useAuth();

    const [openMenu, setOpenMenu] = useState("Factories");

    const location = useLocation();
    const menuRef = useRef(null);

    const toggleMenu = (name) => {
        setOpenMenu(openMenu === name ? null : name);
    };

    useEffect(() => {
        if (menuRef.current) {
            menuRef.current.scrollTop = 0;
        }
    }, [location.pathname]);

    useEffect(() => {
        filteredMenus.forEach((section) => {
            section.items.forEach((item) => {
                if (item.submenu) {
                    const match = item.submenu.find((sub) =>
                        location.pathname.startsWith(sub.link)
                    );

                    if (match) {
                        setOpenMenu(item.name);
                    }
                }
            });
        });
    }, [location.pathname]);

    const menus = [
        {
            title: "Overview",
            items: [
                {
                    name: "Dashboard",
                    icon: <Activity size={18} />,
                    link: "/dashboard",
                    roles: ['super_admin', 'plant_admin', 'engineer', 'viewer'],
                },
            ],
        },

        {
            title: "Infrastructure",
            items: [
                {
                    name: "Factories",
                    icon: <Factory size={18} />,
                    roles: ['super_admin'],
                    submenu: [
                        {
                            name: "Create Factory",
                            link: "/dashboard/factories/create",
                        },
                        {
                            name: "All Factories",
                            link: "/dashboard/factory",
                        },
                    ],
                },

                {
                    name: "Production Lines",
                    icon: <Radar size={18} />,
                    roles: ['super_admin'],
                    submenu: [
                        {
                            name: "Create Line",
                            link: "/dashboard/Productions/create",
                        },
                        {
                            name: "All Lines",
                            link: "/dashboard/Production",
                        },
                    ],
                },
            ],
        },

        {
            title: "Equipment",
            items: [
                {
                    name: "Machines",
                    icon: <Cpu size={18} />,
                    roles: ['super_admin', 'plant_admin', 'engineer', 'viewer'],
                    submenu: [
                        {
                            name: "Machine Registry",
                            link: "/dashboard/Machine",
                        },
                    ],
                },

                {
                    name: "Sensors",
                    icon: <Shield size={18} />,
                    roles: ['super_admin', 'plant_admin', 'engineer', 'viewer'],
                    submenu: [
                        {
                            name: "Sensor Network",
                            link: "/dashboard/Sensor",
                        },
                    ],
                },
            ],
        },

        {
            title: "Operations",
            items: [
                {
                    name: "Alerts",
                    icon: <BellRing size={18} />,
                    roles: ['super_admin', 'plant_admin', 'engineer', 'viewer'],
                    submenu: [
                        {
                            name: "Active Alerts",
                            link: "/dashboard/alert",
                        },
                    ],
                },

                {
                    name: "Maintenance",
                    icon: <Wrench size={18} />,
                    roles: ['super_admin', 'plant_admin', 'engineer', 'viewer'],
                    submenu: [
                        {
                            name: "Maintenance Jobs",
                            link: "/dashboard/Maintenance",
                        },
                    ],
                },
            ],
        },

        {
            title: "Administration",
            items: [
                {
                    name: "Users",
                    icon: <Users size={18} />,
                    link: "/dashboard/users",
                    roles: ['super_admin', 'plant_admin'],
                },

                {
                    name: "Settings",
                    icon: <Settings size={18} />,
                    link: "/dashboard/settings",
                    roles: ['super_admin', 'plant_admin'],
                },
            ],
        },
    ];

    const filteredMenus = menus
        .map((section) => ({
            ...section,
            items: section.items.filter((item) =>
                item.roles.includes(auth?.role)
            ),
        }))
        .filter((section) => section.items.length > 0);

    return (
        <div className="w-full h-screen bg-white border-r border-gray-200 flex flex-col overflow-hidden">
            <style>
                {`
                    *{
                        scrollbar-width: thin;
                        scrollbar-color: #c7d2fe transparent;
                    }

                    *::-webkit-scrollbar{
                        width: 4px;
                    }

                    *::-webkit-scrollbar-track{
                        background: transparent;
                    }

                    *::-webkit-scrollbar-thumb{
                        background: #5669b6;
                        border-radius: 999px;
                    }

                    *::-webkit-scrollbar-thumb:hover{
                        background: #a5b4fc;
                    }
                `}
            </style>

            <div className="px-5 py-5 border-b border-gray-200 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-md">
                        <Hexagon size={22} className="text-white" />
                    </div>

                    <div>
                        <h1 className="text-gray-900 font-bold text-lg">
                            MHMS
                        </h1>

                        <p className="text-gray-500 text-xs">
                            Machine Health Monitoring
                        </p>
                    </div>
                </div>
            </div>

            <div
                ref={menuRef}
                className="flex-1 overflow-y-auto px-3 py-4"
            >
                {filteredMenus.map((section, index) => (
                    <div key={index} className="mb-5">
                        <h2 className="uppercase px-3 mb-3 text-[10px] tracking-[2px] font-semibold text-gray-400">
                            {section.title}
                        </h2>

                        <div className="space-y-1">
                            {section.items.map((item, i) => (
                                <div key={i}>
                                    {item.submenu ? (
                                        <>
                                            <button
                                                onClick={() => toggleMenu(item.name)}
                                                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-300 ${openMenu === item.name
                                                        ? "bg-indigo-50 text-indigo-600"
                                                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {item.icon}

                                                    <span className="text-sm font-medium">
                                                        {item.name}
                                                    </span>
                                                </div>

                                                {openMenu === item.name ? (
                                                    <ChevronDown size={16} />
                                                ) : (
                                                    <ChevronRight size={16} />
                                                )}
                                            </button>

                                            <div
                                                className={`overflow-hidden transition-all duration-500 ${openMenu === item.name
                                                        ? "max-h-96 opacity-100 mt-2"
                                                        : "max-h-0 opacity-0"
                                                    }`}
                                            >
                                                <div className="ml-5 pl-3 border-l border-gray-200 space-y-1">
                                                    {item.submenu.map((sub, index) => (
                                                        <NavLink
                                                            key={index}
                                                            to={sub.link}
                                                            className={({ isActive }) =>
                                                                `block px-3 py-2 rounded-lg text-sm transition-all ${isActive
                                                                    ? "bg-indigo-600 text-white shadow-sm"
                                                                    : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                                                                }`
                                                            }
                                                        >
                                                            {sub.name}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <NavLink
                                            to={item.link}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                                    ? "bg-indigo-600 text-white shadow-sm"
                                                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                                }`
                                            }
                                        >
                                            {item.icon}
                                            {item.name}
                                        </NavLink>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-4 shadow-md">
                    <p className="text-white font-semibold text-sm">
                        {auth?.user?.username || "User"}
                    </p>

                    <p className="text-indigo-100 text-xs mt-1 capitalize">
                        {auth?.role}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashSide;