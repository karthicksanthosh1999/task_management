import React from 'react'

const GobalLoading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-800 z-50">
            <div className="text-center">
                <div
                    className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
                ></div>
                <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Your adventure is about to begin
                </p>
            </div>
        </div>
    )
}

export default GobalLoading