import React, { useState } from 'react'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import { useNavigate } from 'react-router-dom'
import DefaultInput from '../../../component/Form/DefaultInput'
import Dropdown from '../../../component/Form/Dropdown'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'


const CreateNewUser = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange } = useForm({
        email: '',
        role: ''
    })

    const headleCreateUser = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post('user/create-user', values, {
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
                    navigate('/dashboard/users')
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
        <div className="flex items-center justify-center px-4">
            {toast && (
                <div className="fixed top-6 right-6 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

                <h1 className="text-xl font-bold text-gray-900 mb-6">
                    Create New User
                </h1>

                <form onSubmit={headleCreateUser} className="space-y-6">

                    <DefaultInput
                        label={"Enter User's Email Address"}
                        type='email'
                        name={'email'}
                        value={values.email}
                        placeholder={"username@example.com"}
                        required
                        onChange={handleChange}
                    />

                    <Dropdown
                        label={"Select User Type"}
                        name={'role'}
                        value={values.role}
                        required
                        onChange={handleChange}
                        options={[
                            { label: "Super Admin", value: "super_admin" },
                            { label: "Student", value: "student" },
                            { label: "Lecturer", value: "lecturer" },
                            { label: "Staff", value: "staff" },
                        ]}
                    />

                    <div className="">
                        <DefaultButton
                            type='submit'
                            label={loading ? 'Creating New User...' : 'Create New User'}
                        />
                    </div>
                </form>

            </div>

        </div>

    )
}

export default CreateNewUser