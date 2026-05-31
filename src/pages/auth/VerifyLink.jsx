import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../services/api";
import DefaultButton from "../../component/Buttons/DefaultButton";
import { useAuth } from "../../context/AuthContext";
import LoginBgImg from '../../assets/loginBg.jpg'

const VerifyLink = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);
    const [user, setUser] = useState(null);

    const requestSent = useRef(false);

    const token = searchParams.get("token");

    useEffect(() => {

        if (!token) {
            navigate("/");
            return;
        }

        if (requestSent.current) return;
        requestSent.current = true;

        const fetchVerifyData = async () => {

            try {

                const res = await API.get(
                    `/auth/verify-authlink?token=${token}`
                );

                if (res.data.success) {
                    login(res.data.accessToken);
                    setUser(res.data.user);
                    setVerified(true);
                }

            } catch (err) {
                if (err.response?.status === 409) {
                    console.log("Token already used or expired");
                }
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchVerifyData();

    }, [token, navigate, login]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-3">
                    <div className="w-12 h-12 mx-auto border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-indigo-600 font-semibold">Verifying your access...</p>
                </div>
            </div>
        );
    }

    if (!verified) return null;

    return (
        <div
            className="min-h-screen flex items-center justify-center px-6 py-10 relative overflow-hidden"
            style={{
                backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.92), rgba(255,255,255,0.85)),
            url(${LoginBgImg})
        `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >

            <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 text-center border border-white/40">

                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-lg">
                    ✓
                </div>

                <h1 className="text-3xl font-black text-gray-900 mb-4">
                    Verification Successful
                </h1>

                {user && (
                    <div className="bg-white/60 backdrop-blur rounded-2xl p-5 text-left text-sm text-gray-700 mb-6 space-y-3 border border-gray-100">

                        <p>
                            <span className="font-semibold text-indigo-600">Email:</span> {user.email}
                        </p>

                        <p>
                            <span className="font-semibold text-indigo-600">Role:</span> {user.role?.role}
                        </p>

                        <p>
                            <span className="font-semibold text-indigo-600">Last Login:</span>{" "}
                            {new Date(user.last_login).toLocaleString()}
                        </p>

                    </div>
                )}

                <DefaultButton
                    onClick={() => navigate("/dashboard")}
                    label="Continue to Dashboard"
                />

            </div>

        </div>
    );
};

export default VerifyLink;