import { useState } from 'react'
import { useWords } from './useWords'
import { useCountDownTimer } from './useCountDownTimer'
import useTypings from './useTypings'

export type State = 'start' | 'run' | 'finish'
const NUMBER_OF_WORDS = 12
const COUNTDOWN_SECONDS = 30

<<<<<<< HEAD
export function useEngine (): { errors: number, state: State, words: string, timeLeft: number, typed: string, totalTyped: number, restart: () => void } {
=======
export function useEngine (): { state: string, words: string, timeLeft: number, typed: string } {
>>>>>>> parent of 75d565b (Return modification and conditional rendering)
  const [state, setState] = useState<State>('start')
  const { words, UpdateWords } = useWords(NUMBER_OF_WORDS)
  const { timeLeft, resetCountdown, startCountdown } = useCountDownTimer(COUNTDOWN_SECONDS)
  const { clearTyped, cursor, resetTotalTyped, totalTyped, typed } = useTypings(state !== 'finish')

  return { state, words, timeLeft, typed }
}
