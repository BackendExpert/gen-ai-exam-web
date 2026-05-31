import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Toast from '../../../component/Toast/Toast'
import API from '../../../services/api'
import useForm from '../../../hooks/useForm'
import DefaultInput from '../../../component/Form/DefaultInput'
import Dropdown from '../../../component/Form/Dropdown'
import DateInput from '../../../component/Form/DateInput'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const CreateStudent = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange } = useForm({
        full_name: '',
        email: '',
        nic_no: '',
        student_id: '',
        phone: '',
        address: '',
        gender: '',
        dob: '',
        batch: ''
    })

    const headleCreateStudent = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post('students/create-student', values, {
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
                    navigate('/dashboard/students')
                }, 3000)
            } else {
                setToast({
                    success: false,
                    message: res.data.message
                })
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white p-4 mb-8">
            {toast && (
                <div className="fixed top-6 right-6 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <form onSubmit={headleCreateStudent} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <DefaultInput
                        label="Full Name"
                        name="full_name"
                        value={values.full_name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        required
                    />

                    <DefaultInput
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                    
                    <DefaultInput
                        label="NIC Number"
                        name="nic_no"
                        value={values.nic_no}
                        onChange={handleChange}
                        placeholder="Enter NIC number"
                        required
                    />

                    <DefaultInput
                        label="Student ID"
                        name="student_id"
                        value={values.student_id}
                        onChange={handleChange}
                        placeholder="Enter student ID"
                        required
                    />

                    <DefaultInput
                        label="Phone"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                    />
                </div>

                <div>
                    <TextAreaInput
                        label="Address"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        required
                    />

                    <Dropdown
                        label="Gender"
                        name="gender"
                        onChange={handleChange}
                        required
                        options={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                            { label: 'Other', value: 'other' }
                        ]}
                    />

                    <DateInput
                        label="Date of Birth"
                        name="dob"
                        value={values.dob}
                        onChange={handleChange}
                        required
                    />

                    <DefaultInput
                        label="Batch"
                        name="batch"
                        value={values.batch}
                        onChange={handleChange}
                        placeholder="Enter batch"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <DefaultButton
                        type="submit"
                        label={loading ? 'Creating...' : 'Create Student'}
                        disabled={loading}
                    />
                </div>

            </form>
        </div>
    )
}

export default CreateStudent