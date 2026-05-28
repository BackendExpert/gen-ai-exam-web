import React, { useState } from 'react'
import API from '../../services/api'
import DefaultButton from '../../component/Buttons/DefaultButton'
import DefaultInput from '../../component/Form/DefaultInput'
import useForm from '../../hooks/useForm'
import Toast from '../../component/Toast/Toast'
import {
    FaBrain,
    FaGraduationCap,
    FaFingerprint,
    FaArrowRight
} from 'react-icons/fa'
import LoginImg from '../../assets/LoginImg.png'
import LoginButton from '../../component/Buttons/LoginButton'
import LoginBgImg from '../../assets/loginBg.jpg'

const RequestLink = () => {

    const { values, handleChange } = useForm({ email: '' })
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const handleRequestLink = async (e) => {

        e.preventDefault()

        if (!values.email) {
            setToast({
                success: false,
                message: "Email is required"
            })
            return
        }

        setLoading(true)

        try {

            const res = await API.post('/auth/request-authlink', {
                email: values.email
            })

            setToast({
                success: true,
                message: res.data.message
            })

        } catch (err) {

            console.log(err)

            const message =
                err.response?.data?.error?.message ||
                'Something went wrong'

            setToast({
                success: false,
                message
            })

        } finally {
            setLoading(false)
        }
    }

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

            {toast && (
                <div className="fixed top-6 right-6 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-70" />

            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-100 rounded-full blur-3xl opacity-70" />

            <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.08)] relative z-10">

                <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-600 p-12 relative overflow-hidden">

                    <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

                    <div className="relative z-10">

                        <div className="flex items-center gap-3">

                            <div className="bg-white/20 p-3 rounded-2xl">
                                <FaBrain className="text-white text-xl" />
                            </div>

                            <div>
                                <p className="text-white/70 text-sm">
                                    Powered by Gen AI
                                </p>

                                <h1 className="text-white font-bold text-xl">
                                    Student Exam System
                                </h1>
                            </div>

                        </div>

                        <h2 className="mt-14 text-5xl font-black text-white leading-tight">
                            Smarter
                            <br />
                            Digital
                            <br />
                            Education
                        </h2>

                        <p className="mt-6 text-white/80 leading-8 text-lg">
                            Modern AI-powered examination and student management platform
                            for secure authentication, analytics, and intelligent learning.
                        </p>

                    </div>

                    <div className="relative z-10 space-y-5">

                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-5">

                            <div className="bg-white/20 p-3 rounded-xl">
                                <FaGraduationCap className="text-white text-lg" />
                            </div>

                            <div>
                                <h2 className="text-white font-semibold">
                                    Smart Student Management
                                </h2>

                                <p className="text-white/70 text-sm mt-1">
                                    AI-driven academic monitoring
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-5">

                            <div className="bg-white/20 p-3 rounded-xl">
                                <FaFingerprint className="text-white text-lg" />
                            </div>

                            <div>
                                <h2 className="text-white font-semibold">
                                    Secure Authentication
                                </h2>

                                <p className="text-white/70 text-sm mt-1">
                                    Protected login and access control
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="p-8 md:p-14 flex flex-col justify-center">

                    <div className="flex justify-center">

                        <div className="bg-indigo-50 p-5 rounded-3xl">

                            <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 p-4 rounded-2xl inline-flex">
                                <FaGraduationCap className="h-40 w-auto text-white" />
                            </div>
                        </div>

                    </div>

                    <div className="mt-10 text-center">

                        <p className="text-indigo-600 font-semibold tracking-[4px] uppercase text-xs">
                            Welcome Back
                        </p>

                        <h1 className="mt-4 text-4xl font-black text-gray-900">
                            Request Login Link
                        </h1>

                        <p className="mt-4 text-gray-500 leading-7">
                            Enter your registered academic email address
                            to receive a secure authentication link.
                        </p>

                    </div>

                    <form
                        method="post"
                        onSubmit={handleRequestLink}
                        className="mt-10 space-y-5"
                    >

                        <DefaultInput
                            name="email"
                            type="email"
                            placeholder="Enter your academic email"
                            onChange={handleChange}
                            value={values.email}
                        />

                        <LoginButton
                            type="submit"
                            disabled={loading}
                            label={
                                loading
                                    ? "Sending..."
                                    : (
                                        <span className="flex items-center justify-center gap-3">
                                            Request Authentication Link
                                            <FaArrowRight />
                                        </span>
                                    )
                            }
                        />

                    </form>

                    <div className="mt-10 text-center">

                        <p className="text-xs text-gray-400 leading-6">
                            © {new Date().getFullYear()} Student Exam Management System with Gen AI
                        </p>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default RequestLink