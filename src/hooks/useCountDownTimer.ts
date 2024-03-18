import { useCallback, useState, useEffect } from 'react'

function useCountdown (seconds: number) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null)

  const hasTimerEnded = timeLeft <= 0
  const isRunning = intervalId !== null

  const startCountdown = useCallback(() => {
    if (!hasTimerEnded && !isRunning) {
      const id = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
      }, 1000)
      setIntervalId(id)
    }
  }, [setTimeLeft, hasTimerEnded, isRunning])

  const resetCountdown = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
    setTimeLeft(seconds)
  }, [seconds, intervalId])

  // Clear interval when component unmounts or when countdown ends
  useEffect(() => {
    if (hasTimerEnded || !isRunning) {
      if (intervalId) {
        clearInterval(intervalId)
        setIntervalId(null)
      }
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [hasTimerEnded, isRunning, intervalId])

  return { timeLeft, startCountdown, resetCountdown }
}

export default useCountdown
