import React from "react";
import { FaLinkedin, FaGithub, FaGlobe, FaBrain } from "react-icons/fa";

const DashFooter = () => {
    const year = new Date().getFullYear();

    const quickLinks = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Documentation", href: "#" },
        { name: "Support", href: "#" },
        { name: "System Status", href: "#" },
    ];

    return (
        <footer className="bg-white border-t border-gray-100">

            <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-12">

                <div>

                    <div className="flex items-center gap-3">

                        <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 p-3 rounded-2xl shadow-md">
                            <FaBrain className="text-white text-xl" />
                        </div>

                        <div>
                            <h1 className="text-xl font-black text-gray-900">
                                GenAI Exam v1.0.0
                            </h1>

                            <p className="text-xs text-gray-500">
                                AI-Powered Examination System
                            </p>
                        </div>

                    </div>

                    <p className="mt-5 text-gray-500 text-sm leading-6 max-w-sm">
                        A next-generation AI-powered exam platform for intelligent assessment,
                        automation, and smarter academic workflows.
                    </p>

                </div>

                <div>

                    <h2 className="text-gray-900 font-semibold mb-5">
                        Quick Links
                    </h2>

                    <div className="space-y-3">

                        {quickLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="block text-sm text-gray-500 hover:text-indigo-600 transition"
                            >
                                {link.name}
                            </a>
                        ))}

                    </div>

                </div>

                <div>

                    <h2 className="text-gray-900 font-semibold mb-5">
                        Connect With Us
                    </h2>

                    <div className="flex gap-4">

                        <a
                            href="https://www.blackalphalabs.com"
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
                        >
                            <FaGlobe />
                        </a>

                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
                        >
                            <FaLinkedin />
                        </a>

                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
                        >
                            <FaGithub />
                        </a>

                    </div>

                </div>

            </div>

            <div className="border-t border-gray-100 py-6 text-center">

                <p className="text-xs text-gray-500">
                    © {year} GenAI Exam System - v1.0.0 • All rights reserved • Built by{" "}
                    <a
                        href="https://www.blackalphalabs.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:text-indigo-500 transition"
                    >
                        BlackAlphaLabs
                    </a>
                </p>

            </div>

        </footer>
    );
};

export default DashFooter;