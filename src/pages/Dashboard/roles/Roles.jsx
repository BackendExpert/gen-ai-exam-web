import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { FaPen } from 'react-icons/fa6'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const Roles = () => {

    const [roles, setRoles] = useState([])

    const token = localStorage.getItem('token')

    useEffect(() => {

        const fetchallroles = async () => {

            const res = await API.get('user/fetch-role', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setRoles(res.data.result)
            }
            else {
                console.log(res.data.message)
            }
        }

        if (token) fetchallroles()

    }, [token])

    return (
        <div className="space-y-5">

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Roles Management
                        </h1>

                        <p className="text-sm text-gray-500">
                            Manage all system roles and permissions
                        </p>
                    </div>

                    {/* <a href="/dashboard/create-role">
                        <DefaultButton
                            type="button"
                            label="Create New Role"
                        />
                    </a> */}

                </div>

            </div>

            <div className="grid gap-4 md:hidden">

                {roles.length > 0 ? (
                    roles.map((data) => {
                        return (
                            <div
                                key={data._id}
                                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white font-semibold uppercase">
                                            {data.role?.charAt(0)}
                                        </div>

                                        <div>

                                            <h2 className="font-semibold text-gray-800 capitalize">
                                                {data.role}
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                {data.permissions?.length || 0} Permissions
                                            </p>

                                        </div>

                                    </div>

                                    <a
                                        href={`roles/${data._id}`}
                                        className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-indigo-500 hover:text-white transition"
                                    >
                                        <FaPen size={14} />
                                    </a>

                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">

                                    {data.permissions?.length > 0 ? (
                                        data.permissions.map((permission, i) => (
                                            <span
                                                key={i}
                                                className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700"
                                            >
                                                {permission}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-gray-400">
                                            No permissions
                                        </span>
                                    )}

                                </div>

                            </div>
                        )
                    })
                ) : (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-500">
                        No roles found
                    </div>
                )}

            </div>

            <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                #
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                Role
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                Permissions
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {roles.length > 0 ? (
                            roles.map((data, index) => {
                                return (
                                    <tr key={data._id} className="hover:bg-gray-50">

                                        <td className="px-6 py-4 text-gray-600">
                                            {index + 1}
                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white font-semibold uppercase">
                                                    {data.role?.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-800 capitalize">
                                                        {data.role}
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex flex-wrap gap-2">

                                                {data.permissions?.length > 0 ? (
                                                    data.permissions.map((permission, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold"
                                                        >
                                                            {permission}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-gray-400">
                                                        No permissions
                                                    </span>
                                                )}

                                            </div>

                                        </td>

                                        <td className="px-6 py-4 text-center">

                                            <a
                                                href={`roles/${data._id}`}
                                                className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-indigo-500 hover:text-white transition"
                                            >
                                                <FaPen size={14} />
                                            </a>

                                        </td>

                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-10 text-gray-500">
                                    No roles found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default Roles