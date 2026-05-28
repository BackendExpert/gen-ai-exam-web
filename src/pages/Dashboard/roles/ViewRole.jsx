import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../services/api'
import useForm from '../../../hooks/useForm'
import DefaultInput from '../../../component/Form/DefaultInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'


const ViewRole = () => {
    const { id } = useParams()
    const [role, setRole] = useState()
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const [deleteloading, setDeleteLoading] = useState(false)
    const [toast, setToast] = useState(false)

    useEffect(() => {
        const fetchroledata = async () => {
            const res = await API.get(`user/fetch-role-byid/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setRole(res.data.result)
            }
            else {
                console.log(res.data.message)
            }
        }

        if (token) fetchroledata()
    }, [token])

    const { values, handleChange } = useForm({
        permission: ''
    })

    const UpdateRolePermission = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.patch(`user/update-role/${id}`, values, {
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

    const {
        values: deletevalues,
        handleChange: deletehandleChange
    } = useForm({
        permission: ''
    })

    const headledeletePermission = async (e) => {
        e.preventDefault()
        setDeleteLoading(true)

        try {
            const res = await API.delete(`user/delete-permission/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: deletevalues
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
            setDeleteLoading(false)
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
            <div className="md:flex justify-between mb-8">

                <div className="md:w-1/2 bg-white p-6">

                    <div className="flex items-center gap-4">

                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 text-white text-2xl font-bold uppercase">
                            {role?.role?.charAt(0)}
                        </div>

                        <div>

                            <h1 className="text-2xl font-bold text-gray-800 capitalize">
                                {role?.role}
                            </h1>

                            <p className="text-sm text-gray-500">
                                {role?.permissions?.length || 0} Permissions
                            </p>

                        </div>

                    </div>

                    <div className="mt-6">

                        <h2 className="text-sm font-semibold text-gray-500 mb-3">
                            Assigned Permissions
                        </h2>

                        <div className="flex flex-wrap gap-3">

                            {role?.permissions?.length > 0 ? (
                                role.permissions.map((permission, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700"
                                    >
                                        {permission}
                                    </span>
                                ))
                            ) : (
                                <div className="text-sm text-gray-400">
                                    No permissions assigned
                                </div>
                            )}

                            {
                                role?.role === 'super_admin' ?
                                    <div className="">
                                        <p className="text-red-500 font-semibold text-center">
                                            SuperAdmin no need permission to access
                                        </p>
                                    </div>
                                    :
                                    <div className=""></div>
                            }
                        </div>

                    </div>

                </div>
                <div className="md:w-1/2 md:ml-4 md:mt-0 mt-4">
                    {
                        role?.role === 'super_admin' ?
                            <div className="bg-white p-8 flex items-center justify-center">
                                <p className="text-red-500 font-bold text-center">
                                    SuperAdmin Permission cannot be changed
                                </p>
                            </div>
                            :
                            <div>
                                <div className="bg-white p-4 ">
                                    <div className="">
                                        <h1 className="text-gray-500 text-lg font-semibold">Update Permissions (Add new)</h1>
                                    </div>
                                    <div className="">
                                        <form onSubmit={UpdateRolePermission} method="post">
                                            <div className="mt-4">
                                                <DefaultInput
                                                    label={"Enter Permission"}
                                                    name={'permission'}
                                                    value={values.permission}
                                                    placeholder={"user:create"}
                                                    required
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="">
                                                <DefaultButton
                                                    type='submit'
                                                    label={loading ? 'Updating...' : 'Add new Permission'}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="bg-white p-4 mt-4">
                                    <div className="">
                                        <h1 className="text-gray-500 text-lg font-semibold">Delete Permissions (Remove)</h1>
                                    </div>
                                    <form onSubmit={headledeletePermission} method="post">
                                        <div className="mt-4">
                                            <DefaultInput
                                                label={"Enter Permission to Delete"}
                                                name={'permission'}
                                                value={deletevalues.permission}
                                                placeholder={"create:user"}
                                                required
                                                onChange={deletehandleChange}
                                            />
                                        </div>

                                        <div className="">
                                            <DefaultButton
                                                type='submit'
                                                label={deleteloading ? 'Deleting...' : 'Delete Permission'}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default ViewRole