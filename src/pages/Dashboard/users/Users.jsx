import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { FaPen } from 'react-icons/fa6'
import DefaultInput from '../../../component/Form/DefaultInput'
import Dropdown from '../../../component/Form/Dropdown'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const Users = () => {

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [role, setRole] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const token = localStorage.getItem('token')
    const usersPerPage = 10

    useEffect(() => {

        const fetchUsers = async () => {

            const res = await API.get('user/fetch-all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success) {
                setUsers(res.data.result)
            } else {
                console.log(res.data.message)
            }
        }

        if (token) fetchUsers()

    }, [token])

    const uniqueRoles = [
        ...new Set(users.map(u => u?.role?.role))
    ]

    const filteredUsers = users.filter((user) => {

        const email = user.email?.toLowerCase() || ''
        const username = email.split('@')[0]

        const matchesSearch =
            username.includes(search.toLowerCase()) ||
            email.includes(search.toLowerCase())

        const matchesRole =
            role === '' || user?.role?.role === role

        return matchesSearch && matchesRole
    })

    const lastIndex = currentPage * usersPerPage
    const firstIndex = lastIndex - usersPerPage

    const currentUsers = filteredUsers.slice(firstIndex, lastIndex)

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

    return (
        <div className="space-y-5">

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

                    <div className="flex flex-col md:flex-row gap-4 w-full">

                        <div className="w-full md:max-w-sm">
                            <DefaultInput
                                label="Search User"
                                name="search"
                                placeholder="Search by username or email"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setCurrentPage(1)
                                }}
                            />
                        </div>

                        <div className="w-full md:w-60">
                            <Dropdown
                                label="Role"
                                name="role"
                                value={role}
                                onChange={(e) => {
                                    setRole(e.target.value)
                                    setCurrentPage(1)
                                }}
                                options={[
                                    { label: "All Roles", value: "" },
                                    ...uniqueRoles.map((r) => ({
                                        label: r,
                                        value: r
                                    }))
                                ]}
                            />
                        </div>

                    </div>

                    <div className="w-full md:w-auto">
                        <a href="/dashboard/create-user">
                            <DefaultButton
                                type="button"
                                label="Create New User"
                            />
                        </a>
                    </div>

                </div>

            </div>

            <div className="grid gap-4 md:hidden">

                {currentUsers.length > 0 ? (
                    currentUsers.map((data, index) => {
                        return (
                            <div
                                key={data._id}
                                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white font-semibold uppercase">
                                            {data.email?.charAt(0)}
                                        </div>

                                        <div>
                                            <h2 className="font-semibold text-gray-800">
                                                {data.email?.split('@')[0]}
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                {data.email}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {data.account_stats ? <span>Active</span> : <span>Deactive</span>}
                                            </p>
                                        </div>


                                    </div>

                                    <a
                                        href={`users/${data._id}`}
                                        className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-indigo-500 hover:text-white transition"
                                    >
                                        <FaPen size={14} />
                                    </a>

                                </div>

                                <div className="mt-4 flex items-center justify-between">

                                    <span className="text-sm font-medium text-gray-500">
                                        Role
                                    </span>

                                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">
                                        {data?.role?.role}
                                    </span>

                                </div>

                            </div>
                        )
                    })
                ) : (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-500">
                        No users found
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
                                User
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                Email
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                Account Stats
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                Role
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {currentUsers.length > 0 ? (
                            currentUsers.map((data, index) => {
                                return (
                                    <tr key={data._id} className="hover:bg-gray-50">

                                        <td className="px-6 py-4 text-gray-600">
                                            {firstIndex + index + 1}
                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white font-semibold uppercase">
                                                    {data.email?.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {data.email?.split('@')[0]}
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {data.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold capitalize">
                                                {data?.account_stats ? "Active" : "Deactive"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold capitalize">
                                                {data?.role?.role}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-center">

                                            <a
                                                href={`users/${data._id}`}
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
                                <td colSpan={5} className="text-center py-10 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>

            <div className="flex justify-center gap-2 bg-white p-4">

                <button
                    onClick={() => setCurrentPage(p => p - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border text-indigo-600 disabled:opacity-50"
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-lg ${currentPage === i + 1
                            ? 'bg-indigo-500 text-white'
                            : 'border text-indigo-600'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border text-indigo-600 disabled:opacity-50"
                >
                    Next
                </button>

            </div>

        </div>
    )
}

export default Users