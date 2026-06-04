import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import { FaPen } from 'react-icons/fa6'

const Courses = () => {

    const token = localStorage.getItem('token')
    const [courses, setCourses] = useState([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const coursesPerPage = 10

    useEffect(() => {

        const fetchallcourses = async () => {

            const res = await API.get('course/fetch-courses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                setCourses(res.data.result)
            }
        }

        if (token) fetchallcourses()

    }, [token])

    const filteredCourses = courses.filter((course) => {

        const id = course.course_id?.toLowerCase() || ''
        const name = course.course_name?.toLowerCase() || ''

        const q = search.toLowerCase()

        return id.includes(q) || name.includes(q)
    })

    const lastIndex = currentPage * coursesPerPage
    const firstIndex = lastIndex - coursesPerPage

    const currentCourses = filteredCourses.slice(firstIndex, lastIndex)

    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)

    return (
        <div className="space-y-5">

            <div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center">

                <div className="w-full md:max-w-sm">
                    <input
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Search by course id or name"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                </div>

                <a href="/dashboard/courses/create">
                    <DefaultButton
                        type="button"
                        label="Create New Course"
                    />
                </a>

            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                <table className="min-w-full divide-y divide-gray-200">

                    <thead className="bg-gray-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                #
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                Course ID
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                Course Name
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                                Lecturer
                            </th>

                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {currentCourses.length > 0 ? (
                            currentCourses.map((course, index) => {
                                return (
                                    <tr key={course._id} className="hover:bg-gray-50">

                                        <td className="px-6 py-4 text-gray-600">
                                            {firstIndex + index + 1}
                                        </td>

                                        <td className="px-6 py-4 font-semibold text-gray-700">
                                            {course.course_id}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {course.course_name}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {course?.course_lectuer?.email || "N/A"}
                                        </td>

                                        <td className="px-6 py-4 text-center">

                                            <a
                                                href={`/dashboard/courses/${course._id}`}
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
                                    No courses found
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

                {[...Array(totalPages)].map((_, i) => {
                    return (
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
                    )
                })}

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

export default Courses