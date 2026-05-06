import React, { useState, useEffect } from 'react'
import { draftsAPI } from '../services/api'
import { toast } from 'react-hot-toast'

const DraftsContext = React.createContext()

export const DraftsProvider = ({ children }) => {
    const [drafts, setDrafts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchDrafts = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await draftsAPI.getUserDrafts()
            setDrafts(data.result || [])
        } catch (err) {
            setError(err.message)
            console.error('Error fetching drafts:', err)
        } finally {
            setLoading(false)
        }
    }

    const approveDraft = async (draftId) => {
        const toastId = toast.loading("Sending email... 📤")

        try {
            await draftsAPI.approveDraft(draftId)
            setDrafts(prev => prev.filter((d) => d._id !== draftId))

            toast.success("Draft approved. Email will be sent ✅", {
                id: toastId
            })

            setTimeout(fetchDrafts, 3000)

        } catch (err) {
            toast.error("Failed to approve draft ❌", {
                id: toastId
            })
            setError(err.message)
            throw err
        }
    }
    const rejectDraft = async (draftId) => {
        try {
            await draftsAPI.rejectDraft(draftId)

            setDrafts(prev => prev.filter((d) => d._id !== draftId))

            toast.success("Draft rejected ❌")

        } catch (err) {
            toast.error("Failed to reject draft ❌")
            setError(err.message)
            throw err
        }
    }

    const editDraft = async (draftId, data) => {
        const toastId = toast.loading("Updating draft...")

        try {
            const updatedDraft = await draftsAPI.editDraft(draftId, data)

            setDrafts(prev =>
                prev.map((d) =>
                    d._id === draftId ? updatedDraft.result : d
                )
            )

            toast.success("Draft updated successfully ✅", {
                id: toastId
            })

        } catch (err) {
            toast.error("Failed to update draft ❌", {
                id: toastId
            })
            setError(err.message)
            throw err
        }
    }

    return (
        <DraftsContext.Provider
            value={{
                drafts,
                loading,
                error,
                fetchDrafts,
                approveDraft,
                rejectDraft,
                editDraft,
            }}
        >
            {children}
        </DraftsContext.Provider>
    )
}

export const useDrafts = () => {
    const context = React.useContext(DraftsContext)
    if (!context) {
        throw new Error('useDrafts must be used within DraftsProvider')
    }
    return context
}
