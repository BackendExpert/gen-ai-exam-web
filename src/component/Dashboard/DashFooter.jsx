import React from "react";
import {
    FaLinkedin,
    FaGithub,
    FaGlobe,
} from "react-icons/fa";

const DashFooter = () => {
    const year = new Date().getFullYear();

    const quickLinks = [
        {
            name: "Dashboard",
            href: "/dashboard",
        },
        {
            name: "Documentation",
            href: "#",
        },
        {
            name: "Support",
            href: "#",
        },
        {
            name: "System Status",
            href: "#",
        },
    ];

    return (
        <footer className="bg-white">

            <div className="max-w-7xl mx-auto px-8 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">

                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">

                    <h1 className="text-indigo-600 font-bold text-lg tracking-tight">
                        MHMS
                    </h1>

                    <p className="text-sm text-gray-400 md:ml-2">
                        © {year} Machine Health Monitoring System. All rights reserved.
                    </p>

                </div>

                <div className="flex flex-wrap gap-5">

                    {quickLinks.map((link, index) => (

                        <a
                            key={index}
                            href={link.href}
                            className="text-sm text-gray-500 hover:text-indigo-600 transition"
                        >
                            {link.name}
                        </a>

                    ))}

                </div>

                <div className="flex items-center gap-4">

                    <a
                        href="https://www.blackalphalabs.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-indigo-600 transition"
                    >
                        <FaGlobe className="w-5 h-5" />
                    </a>

                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-indigo-600 transition"
                    >
                        <FaLinkedin className="w-5 h-5" />
                    </a>

                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-indigo-600 transition"
                    >
                        <FaGithub className="w-5 h-5" />
                    </a>

                </div>

            </div>

            <div className="py-3">

                <p className="text-center text-xs text-gray-400">

                    Engineered by

                    <a
                        href="https://www.blackalphalabs.com"
                        target="_blank"
                        rel="noreferrer"
                        className="mx-1 text-indigo-600 hover:text-indigo-500 transition"
                    >
                        BlackAlphaLabs PVT.Ltd
                    </a>

                    • Enterprise Monitoring Platform

                </p>

            </div>

        </footer>
    );
};

export default DashFooter;