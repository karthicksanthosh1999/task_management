import React, { useEffect, useState } from 'react'

const useDebounce = (key: string, delay = 500) => {

    const [debounce, setDebounce] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(key)
        }, delay)

        return () => clearTimeout(timer)
    }, [key, delay])

    return debounce
}

export default useDebounce
