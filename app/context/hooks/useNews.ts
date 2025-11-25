import { useContext } from 'react'
import { NewsContext } from '../newContext'

const useNews = () => {
  const context = useContext(NewsContext);

  if (!context) {
    throw new Error("useNext must be inside the provider")
  }

  return context;
}

export default useNews
