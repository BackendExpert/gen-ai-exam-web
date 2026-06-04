import React, { useEffect, useState } from 'react'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultInput from '../../../component/Form/DefaultInput'
import Dropdown from '../../../component/Form/Dropdown'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'
import { useNavigate } from 'react-router-dom'

const CreateCourse = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [lecturer, setLectuers] = useState([])

    useEffect(() => {
        const fetchLecturers = async () => {
            const res = await API.get('course/fetch-lectuers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (res.data.success) {
                setLectuers(res.data.result);
            } else {
                console.log(res.data.message);
            }
        };

        if (token) fetchLecturers();
    }, [token]);

    const { values, handleChange } = useForm({
        course_id: '',
        course_name: '',
        course_lectuer: '',
    })

    const headlerCreateCourse = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post('course/create-course', values, {
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
                    navigate('/dashboard/course')
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
            <div className="bg-white p-4 rounded shadow">
                <form onSubmit={headlerCreateCourse} method="post">
                    <div className="">
                        <DefaultInput
                            label={"Enter Course ID"}
                            name={'course_id'}
                            value={values.course_id}
                            required
                            onChange={handleChange}
                            placeholder={"ABC1101..."}
                        />
                    </div>
                    <div className="">
                        <DefaultInput
                            label={"Enter Course Name"}
                            name={'course_name'}
                            value={values.course_name}
                            required
                            onChange={handleChange}
                            placeholder={"Computer Science..."}
                        />
                    </div>
                    <div className="">
                        <Dropdown
                            label={"Select Lecturer"}
                            name={"course_lectuer"}
                            onChange={handleChange}
                            required
                            options={lecturer.map((item) => ({
                                value: item._id,
                                label: item.email
                            }))}
                        />
                    </div>

                    <div className="">
                        <DefaultButton
                            type='submit'
                            label={loading ? 'Creating Course...' : 'Create Course'}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCourse
