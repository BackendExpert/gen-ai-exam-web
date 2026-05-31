import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { useNavigate } from 'react-router-dom'
import FileInput from '../../../component/Form/FileInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'
import API from '../../../services/api'

const StudentUploadBulk = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState('')
    const [preview, setPreview] = useState([])
    const [result, setResult] = useState(null)
    const [toast, setToast] = useState(null)

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        setFileName(file.name)

        const reader = new FileReader()

        reader.onload = (event) => {
            const data = event.target.result
            const workbook = XLSX.read(data, { type: 'binary' })

            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]

            const jsonData = XLSX.utils.sheet_to_json(worksheet)

            setPreview(jsonData)
        }

        reader.readAsBinaryString(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (preview.length === 0) return

        setLoading(true)

        try {
            const res = await API.post(
                'students/upload-bulk',
                preview,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (res.data.success) {

                setResult(res.data)

                setToast({
                    success: true,
                    message: res.data.message
                })

                setPreview([])
                setFileName('')

            } else {
                setToast({
                    success: false,
                    message: res.data.message
                })
            }

        } catch (err) {
            setToast({
                success: false,
                message: 'Upload failed'
            })
        } finally {
            setLoading(false)
        }
    }

    const goToDashboard = () => {
        navigate('/dashboard/students')
    }

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">

            {toast && (
                <div className="fixed top-6 right-6 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <FileInput
                    label={"Upload Excel File"}
                    onChange={handleFileUpload}
                />

                {fileName && (
                    <p className="text-sm text-gray-500 mt-2">
                        Selected File: {fileName}
                    </p>
                )}

                {preview.length > 0 && (
                    <div className="mt-4 text-xs text-gray-500 space-y-1">
                        {preview.slice(0, 5).map((item, i) => (
                            <div key={i}>
                                {item.full_name} - {item.student_id}
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-4">
                    <DefaultButton
                        type="submit"
                        label={loading ? "Uploading..." : "Upload Bulk Students"}
                    />
                </div>

            </form>

            {result && (
                <div className="mt-6 border border-gray-200 rounded-lg p-4">

                    <p className="font-semibold text-green-600">
                        Upload Completed
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                        Inserted: {result.inserted_count} |
                        Skipped: {result.skipped_count}
                    </p>

                    {result.skipped_students?.length > 0 && (
                        <div className="mt-3 text-xs text-red-500 space-y-1">
                            {result.skipped_students.map((s, i) => (
                                <div key={i}>
                                    {s.student_id} - {s.email} ({s.reason})
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-4">
                        <DefaultButton
                            type="button"
                            label="Go to Dashboard"
                            onClick={goToDashboard}
                        />
                    </div>

                </div>
            )}

        </div>
    )
}

export default StudentUploadBulk