'use client';

import { createContext } from 'react'

export type TNewsType = {
    toggleNews: () => void,
    toggleSnowFall: () => void,
    newsEnable: boolean,
    snowfallEnable: boolean
}

export const NewsContext = createContext<TNewsType | undefined>(undefined)
