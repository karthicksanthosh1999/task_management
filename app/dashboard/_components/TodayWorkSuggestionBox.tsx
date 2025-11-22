'use client';
import { AINotices } from '@/components/AiNotices';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const TodayWorkSuggestionBox = () => {

    const [suggestions, setSuggestions] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get('/api/ai/project/generate-task')
            .then((res) => {
                setSuggestions(res.data?.suggestion)
                setIsLoading(false)
            }).catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [])
    return <AINotices suggestions={suggestions} loading={isLoading} />
}

export default TodayWorkSuggestionBox
