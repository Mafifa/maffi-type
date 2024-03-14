import { useCallback, useState, useRef, useEffect } from 'react'

export function useCountDownTimer (seconds: number): { timeLeft: number, startCountdown: () => void, resetCountdown: () => void } {
  const [timeLeft, setTimeLeft] = useState(seconds)
  const intervalRef = useRef<NodeJS.Timer | null>(null)

  const startCountdown = useCallback(() => {
    setTimeLeft((timeLeft) => timeLeft - 1)
  }, [setTimeLeft])

  const resetCountdown = useCallback(() => {
    console.log('Reiniciando contador...')

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // When the countdown reaches 0, clear the countdown interval
    useEffect(() => {
      if (!timeLeft && intervalRef.current) {
        console.log('Limpiando intervalos...')

        clearInterval(intervalRef.current)
      }
    }, [timeLeft, intervalRef])

    setTimeLeft(seconds)
  }, [seconds])
  return { timeLeft, startCountdown, resetCountdown }
}
