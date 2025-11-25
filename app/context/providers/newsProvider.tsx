'use client';
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { NewsContext } from '../newContext';

const NewsProvider = ({ children }: { children: ReactNode }) => {

    const [newsEnable, setNewsEnable] = useState<boolean>(true);
    const [snowfallEnable, SetSnowFallEnable] = useState<boolean>(false);

    useEffect(() => {
        const currentSnowState = localStorage.getItem("snow");
        if (currentSnowState === "true") SetSnowFallEnable(true)
    }, [])

    const toggleNews = useCallback(() => {
        setNewsEnable((preV) => !preV)
    }, [])

    const toggleSnowFall = useCallback(() => {
        SetSnowFallEnable((preV) => {
            const update = !preV;
            localStorage.setItem("snow", update ? "true" : 'false')
            return update
        })
    }, [])

    const value = { toggleNews, toggleSnowFall, newsEnable, snowfallEnable }

    return (
        <NewsContext.Provider value={value} >
            {children}
        </NewsContext.Provider>
    )
}

export default NewsProvider
