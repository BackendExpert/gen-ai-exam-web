import React from "react";
import {
    AlertTriangle,
    ArrowRight,
    LifeBuoy,
} from "lucide-react";

const DashError = () => {
    return (
        <div className="flex min-h-[80vh] w-full items-center justify-center px-6 py-16 bg-white">

            <div className="max-w-2xl text-center">

                <div className="flex justify-center mb-8">

                    <div className="relative">

                        <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-100" />

                        <div className="relative p-6">

                            <AlertTriangle
                                className="w-16 h-16 text-indigo-600"
                                strokeWidth={1.5}
                            />

                        </div>

                    </div>

                </div>

                <h1 className="text-8xl font-bold tracking-tight text-indigo-600">
                    501
                </h1>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900">
                    Module Under Development
                </h2>

                <p className="mt-5 text-lg leading-8 text-gray-400 max-w-xl mx-auto">

                    This monitoring module is currently being engineered
                    for MHMS enterprise deployment. Please revisit later
                    or contact the platform administrator.

                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">

                    <button
                        onClick={() => window.location.href = "/dashboard"}
                        className="group flex items-center gap-3 text-indigo-600 font-semibold hover:gap-4 transition-all"
                    >

                        <span>
                            Return to Dashboard
                        </span>

                        <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition"
                        />

                    </button>

                    <a
                        href="#"
                        className="flex items-center gap-3 text-gray-500 font-medium hover:text-indigo-600 transition"
                    >

                        <LifeBuoy size={18} />

                        <span>
                            Contact Support
                        </span>

                    </a>

                </div>

                <p className="mt-14 text-xs tracking-[3px] uppercase text-gray-300">
                    MHMS Enterprise Platform
                </p>

            </div>

        </div>
    );
};

export default DashError;