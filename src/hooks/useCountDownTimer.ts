import { useCallback, useState, useRef, useEffect } from 'react'

function useCountdown (initialSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const intervalRef = useRef<number | null>(null)
  const isRunning = intervalRef.current !== null

  const startCountdown = useCallback(() => {
    if (!isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1
          if (newTimeLeft <= 0) {
            window.clearInterval(intervalRef.current!)
            intervalRef.current = null
            return 0
          } else {
            return newTimeLeft
          }
        })
      }, 1000)
    }
  }, [isRunning, timeLeft])

  const resetCountdown = useCallback((seconds: number = initialSeconds) => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setTimeLeft(seconds)
  }, [initialSeconds])

  // Clear interval when component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
      }
    }
  }, [])

  return { timeLeft, startCountdown, resetCountdown }
}

export default useCountdown
