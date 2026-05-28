import React from "react";

const DefultError = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-[#060816] text-white relative overflow-hidden">

            <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-red-500/20 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-indigo-500/20 blur-[150px] rounded-full" />

            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, white 1px, transparent 1px),
                        linear-gradient(to bottom, white 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px"
                }}
            />

            <div className="relative text-center max-w-2xl px-6">

                <div className="flex justify-center mb-8">

                    <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-3xl shadow-2xl">
                        <span className="text-6xl font-black">404</span>
                    </div>

                </div>

                <h2 className="text-4xl font-black">
                    Lost in the System
                </h2>

                <p className="mt-5 text-gray-300 text-base leading-7 max-w-xl mx-auto">
                    The page you are looking for does not exist, was moved, or never existed.
                    Our AI system suggests returning to safety zone.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                    <a href="/">
                        <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 font-semibold shadow-xl hover:scale-105 transition-all duration-300">
                            Go Home
                        </button>
                    </a>

                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-3 rounded-2xl border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                    >
                        Go Back
                    </button>

                </div>

                <p className="mt-10 text-xs text-gray-500">
                    Error Code • 404 • System route not found
                </p>

            </div>

        </div>
    );
};

export default DefultError;