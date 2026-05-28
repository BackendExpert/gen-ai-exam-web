import React, { useState } from 'react'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultInput from '../../../component/Form/DefaultInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const CreateNewRole = () => {
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)

    const { values, handleChange } = useForm({
        role: ''
    })

    const headleCreateRole = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post('user/create-role', values, {
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
                    navigate('/dashboard/roles')
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
            <div className="bg-white p-4">
                <div className="">
                    <form onSubmit={headleCreateRole} method="post">
                        <div className="">
                            <DefaultInput 
                                label={"Enter Role"}
                                name={'role'}
                                value={values.role}
                                placeholder={"admin"}
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="">
                            <DefaultButton 
                                type='submit'
                                label={loading ? 'Creating...' : 'Create New Role'}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNewRole