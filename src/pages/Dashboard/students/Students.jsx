import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { FaPen } from 'react-icons/fa6'
import DefaultInput from '../../../component/Form/DefaultInput'
import Dropdown from '../../../component/Form/Dropdown'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const Students = () => {

    const [students, setStudents] = useState([])
    const [search, setSearch] = useState('')
    const [gender, setGender] = useState('')
    const [batch, setBatch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const token = localStorage.getItem('token')
    const studentsPerPage = 10

    useEffect(() => {

        const fetchStudents = async () => {

            const res = await API.get('students/fetch-all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success) {
                setStudents(res.data.result)
            } else {
                console.log(res.data.message)
            }
        }

        if (token) fetchStudents()

    }, [token])

    const uniqueGenders = [
        ...new Set(students.map(s => s?.gender))
    ]

    const uniqueBatches = [
        ...new Set(students.map(s => s?.batch))
    ]

    const filteredStudents = students.filter((student) => {

        const email = student?.user?.email?.toLowerCase() || ''
        const username = email.split('@')[0]

        const fullName = student?.full_name?.toLowerCase() || ''
        const nic = student?.nic_no?.toLowerCase() || ''
        const studentId = student?.student_id?.toLowerCase() || ''

        const matchesSearch =
            username.includes(search.toLowerCase()) ||
            fullName.includes(search.toLowerCase()) ||
            nic.includes(search.toLowerCase()) ||
            studentId.includes(search.toLowerCase())

        const matchesGender =
            gender === '' || student?.gender === gender

        const matchesBatch =
            batch === '' || student?.batch === batch

        return matchesSearch && matchesGender && matchesBatch
    })

    const lastIndex = currentPage * studentsPerPage
    const firstIndex = lastIndex - studentsPerPage

    const currentStudents = filteredStudents.slice(firstIndex, lastIndex)

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)

    return (
        <div className="space-y-5 mb-8">

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

                    <div className="flex flex-col md:flex-row gap-4 w-full">

                        <div className="w-full md:max-w-sm">
                            <DefaultInput
                                label="Search Student"
                                name="search"
                                placeholder="Search by username, fullname, nic or student id"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setCurrentPage(1)
                                }}
                            />
                        </div>

                        <div className="w-full md:w-60">
                            <Dropdown
                                label="Gender"
                                name="gender"
                                value={gender}
                                onChange={(e) => {
                                    setGender(e.target.value)
                                    setCurrentPage(1)
                                }}
                                options={[
                                    { label: "All Gender", value: "" },
                                    ...uniqueGenders.map((g) => ({
                                        label: g,
                                        value: g
                                    }))
                                ]}
                            />
                        </div>

                        <div className="w-full md:w-60">
                            <Dropdown
                                label="Batch"
                                name="batch"
                                value={batch}
                                onChange={(e) => {
                                    setBatch(e.target.value)
                                    setCurrentPage(1)
                                }}
                                options={[
                                    { label: "All Batch", value: "" },
                                    ...uniqueBatches.map((b) => ({
                                        label: b,
                                        value: b
                                    }))
                                ]}
                            />
                        </div>

                    </div>

                    <div className="">
                        <div className="md:flex">
                            <div className="">
                                <a href="/dashboard/student/create">
                                    <DefaultButton
                                        type='button'
                                        label='Create Single Student'
                                    />
                                </a>
                            </div>

                            <div className="md:ml-4 md:mt-0 mt-4">
                                <a href="/dashboard/student/upload-bulk">
                                    <DefaultButton
                                        type='button'
                                        label='Upload Student Bluk'
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div className="grid grid-cols-1 gap-4 md:hidden">

                {currentStudents.length > 0 ? (
                    currentStudents.map((data, index) => {
                        return (
                            <div
                                key={data._id}
                                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm w-full overflow-hidden"
                            >

                                <div className="flex items-start justify-between gap-3">

                                    <div className="flex items-start gap-3 min-w-0 flex-1">

                                        <div className="flex h-12 w-12 min-w-[48px] items-center justify-center rounded-full bg-indigo-500 text-white font-semibold uppercase">
                                            {data?.full_name?.charAt(0)}
                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <h2 className="font-semibold text-gray-800 break-words">
                                                {data?.full_name}
                                            </h2>

                                            <p className="text-sm text-gray-500 break-all">
                                                {data?.user?.email}
                                            </p>

                                            <p className="text-sm text-gray-500 break-words">
                                                {data?.student_id}
                                            </p>

                                        </div>

                                    </div>

                                    <a
                                        href={`students/${data._id}`}
                                        className="flex h-10 w-10 min-w-[40px] items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-indigo-500 hover:text-white transition"
                                    >
                                        <FaPen size={14} />
                                    </a>

                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3">

                                    <div className="rounded-xl bg-gray-50 p-3">

                                        <p className="text-xs text-gray-500">
                                            Gender
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-indigo-600 capitalize break-words">
                                            {data?.gender}
                                        </p>

                                    </div>

                                    <div className="rounded-xl bg-gray-50 p-3">

                                        <p className="text-xs text-gray-500">
                                            Batch
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-indigo-600 break-words">
                                            {data?.batch}
                                        </p>

                                    </div>

                                </div>

                            </div>
                        )
                    })
                ) : (
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-500">
                        No students found
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
                                Student
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                Email
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                NIC
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                Student ID
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                Gender
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                Batch
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {currentStudents.length > 0 ? (
                            currentStudents.map((data, index) => {
                                return (
                                    <tr key={data._id} className="hover:bg-gray-50">

                                        <td className="px-6 py-4 text-gray-600">
                                            {firstIndex + index + 1}
                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white font-semibold uppercase">
                                                    {data?.full_name?.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-800">
                                                        {data?.full_name}
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {data?.user?.email}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {data?.nic_no}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {data?.student_id}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold capitalize">
                                                {data?.gender}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold capitalize">
                                                {data?.batch}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-center">

                                            <a
                                                href={`students/${data._id}`}
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
                                <td colSpan={8} className="text-center py-10 text-gray-500">
                                    No students found
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

export default Students