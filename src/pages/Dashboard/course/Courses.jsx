import React, { useEffect, useState } from 'react'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const Courses = () => {
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchallcourses = async () => {
            const res = await API.get('course/fetch-courses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if(res.data.success === true){
                setCourses(res.data.result)
            }
        }

        if(token) fetchallcourses()
    }, [token])

    return (
        <div>
            <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between">
                    <div className="">
                        <h1 className="text-xl font-semibold text-gray-500">Courses</h1>
                    </div>
                    <div className="">
                        <a href="/dashboard/courses/create">
                            <DefaultButton 
                                type='button'
                                label='Create New Course'
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Courses
