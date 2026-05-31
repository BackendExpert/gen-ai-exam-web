import React from 'react'
import { useAuth } from '../../../context/AuthContext'

const MyProfile = () => {
    const { auth } = useAuth()

    if (auth?.role === "student") {
        return (
            <div>MyProfile Student</div>
        )
    }
    else {
        return (
            <div>MyProfile</div>
        )
    }

}

export default MyProfile