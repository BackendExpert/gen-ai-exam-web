import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../../services/api'
import DefaultInput from '../../../component/Form/DefaultInput'
import Dropdown from '../../../component/Form/Dropdown'
import useForm from '../../../hooks/useForm'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'


const ViewUser = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    useEffect(() => {
        const fetchuserbyid = async (e) => {
            const res = await API.get(`user/fetch/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                // console.log(res.data.result)
                setUser(res.data.result)
            }
            else {
                console.log(res.data.message)
            }
        }

        if (token) fetchuserbyid()
    }, [token])


    const { values, handleChange } = useForm({
        role: '',
        account_stats: ''
    })

    const headleUpdateUserData = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (values.role === '' && values.account_stats === '') {
            setToast({
                success: false,
                message: "At least one input field required"
            })

            setLoading(false)
            return
        }


        try {
            const payload = {
                ...values,
                account_stats:
                    values.account_stats === "true"
                        ? true
                        : values.account_stats === "false"
                            ? false
                            : values.account_stats
            }
            const res = await API.patch(`user/update/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message
                })
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            }
            else {
                setToast({
                    success: false,
                    message: res.data.message
                })
            }
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <div>
            {toast && (
                <div className="fixed top-6 right-6 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="md:flex justify-between">
                <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg uppercase">
                            {user?.email?.charAt(0)}
                        </div>

                        <div>
                            <h1 className="text-lg font-bold text-gray-900">
                                {user?.email?.split('@')[0]}
                            </h1>

                            <p className="text-sm text-gray-500">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Role</span>
                            <span className="font-semibold text-indigo-600 capitalize">
                                {user?.role?.role}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Account Status</span>
                            <span className={`font-semibold ${user?.account_stats ? 'text-green-600' : 'text-red-500'}`}>
                                {user?.account_stats ? 'Active' : 'Inactive'}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Last Login</span>
                            <span className="font-semibold text-gray-700">
                                {user?.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Login IP</span>
                            <span className="font-semibold text-gray-700">
                                {user?.login_ip || '-'}
                            </span>
                        </div>

                    </div>

                </div>

                <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:ml-4 md:mt-0 mt-4">
                    <div className="">
                        <h1 className="text-gray-500 text-lg font-semibold mb-4">Update User Information</h1>
                        <form onSubmit={headleUpdateUserData} className="space-y-5">

                            <Dropdown
                                label="Select User Role"
                                name="role"
                                value={values.role}
                                onChange={handleChange}
                                options={[
                                    { label: "Super Admin", value: "super_admin" },
                                    { label: "Lecturer", value: "lecturer" },
                                    { label: "Student", value: "student" },
                                    { label: "Staff", value: "staff" },
                                ]}
                            />

                            <Dropdown
                                label="Account Status"
                                name="account_stats"
                                value={values.account_stats}
                                onChange={handleChange}
                                options={[
                                    { label: "Active", value: true },
                                    { label: "Deactive", value: false },
                                ]}
                            />

                            <DefaultButton
                                type="submit"
                                label={loading ? "Updating..." : "Update User"}
                            />

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUser