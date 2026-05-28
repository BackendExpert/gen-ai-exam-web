import React, { useEffect, useState } from 'react';
import { MdLockOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(5);

    useEffect(() => {
        if (count <= 0) {
            localStorage.clear();
            navigate('/', { replace: true });
            return;
        }

        const timer = setTimeout(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [count, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-[#060816] relative overflow-hidden">

            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-500/20 blur-[140px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 blur-[140px] rounded-full" />

            <div className="relative z-10 w-full max-w-md">

                <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[30px] shadow-2xl p-10 text-center">

                    <div className="flex justify-center mb-6">

                        <div className="bg-gradient-to-r from-red-500 to-pink-500 p-5 rounded-3xl shadow-xl">

                            <MdLockOutline size={50} className="text-white" />

                        </div>

                    </div>

                    <h1 className="text-3xl font-black text-white">
                        Unauthorized Access
                    </h1>

                    <p className="text-gray-300 mt-4 leading-7 text-sm">
                        You don’t have permission to access this page.
                        This session will be terminated automatically.
                    </p>

                    <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-5">

                        <p className="text-gray-300 text-sm">
                            Redirecting in
                        </p>

                        <p className="text-5xl font-black text-red-400 mt-2">
                            {count}
                        </p>

                        <p className="text-xs text-gray-400 mt-2">
                            seconds remaining
                        </p>

                    </div>

                    <div className="mt-8 h-2 w-full bg-white/10 rounded-full overflow-hidden">

                        <div
                            className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300"
                            style={{ width: `${(count / 5) * 100}%` }}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Unauthorized;