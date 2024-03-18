import { useCallback, useState, useRef, useEffect, type MutableRefObject } from 'react'

function useCountdown (seconds: number) {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const intervalRef = useRef<MutableRefObject<NodeJS.Timer | null>>({ current: null })
  const hasTimerEnded = timeLeft <= 0
  const isRunning = intervalRef.current.current != null

  const startCountdown = useCallback(() => {
    if (!hasTimerEnded && !isRunning) {
      intervalRef.current.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
      }, 1000)
    }
  }, [setTimeLeft, hasTimerEnded, isRunning])

  const resetCountdown = useCallback(() => {
    clearInterval(intervalRef.current.current!)
    intervalRef.current.current = null
    setTimeLeft(seconds)
  }, [seconds])

  // when the countdown reaches 0, clear the countdown interval
  useEffect(() => {
    if (hasTimerEnded) {
      clearInterval(intervalRef.current.current!)
      intervalRef.current.current = null
    }
  }, [hasTimerEnded])

  // clear interval when component unmounts
  useEffect(() => {
    return () => { clearInterval(intervalRef.current.current!) }
  }, [])

  return { timeLeft, startCountdown, resetCountdown }
}

export default useCountdown
