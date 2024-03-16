import { useCallback, useEffect, useState } from 'react'
import { useWords } from './useWords'
import useCountdown from './useCountDownTimer'
import useTypings from './useTypings'
import { countErrors } from '../utils/Helpers'

export type State = 'start' | 'run' | 'finish'
const NUMBER_OF_WORDS = 12
const COUNTDOWN_SECONDS = 30

export function useEngine (): { errors: number, state: State, words: string, timeLeft: number, typed: string, totalTyped: number, restart: () => void } {
  const [state, setState] = useState<State>('start')
  const { words, UpdateWords } = useWords(NUMBER_OF_WORDS)
  const { timeLeft, resetCountdown, startCountdown } = useCountdown(COUNTDOWN_SECONDS)
  const { clearTyped, cursor, resetTotalTyped, totalTyped, typed } = useTypings(state !== 'finish')
  const [errors, setErrors] = useState(0)

  const isStarting = state === 'start' && cursor > 0
  const areWordsFinished = cursor === words.length

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor)
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached))
  }, [typed, words, cursor])

  // as soon the user starts typing the first letter, we start
  useEffect(() => {
    if (isStarting) {
      setState('run')
      startCountdown()
    }
  }, [isStarting, startCountdown, cursor])

  // when the time is up, we've finished
  useEffect(() => {
    if (!timeLeft) {
      console.log('timeus up...')
      setState('finish')
      sumErrors()
    }
  }, [timeLeft, sumErrors])

  // when the current words are all filled up
  // we generate and show another set of the words

  useEffect(() => {
    if (areWordsFinished) {
      console.log('words are finished')
      sumErrors()
      UpdateWords()
      clearTyped()
    }
  }, [
    cursor,
    words,
    clearTyped,
    typed,
    areWordsFinished,
    UpdateWords,
    sumErrors
  ])

  const restart = useCallback(() => {
    console.log('restarting...')
    resetCountdown()
    resetTotalTyped()
    setState('start')
    setErrors(0)
    UpdateWords()
    clearTyped()
  }, [clearTyped, UpdateWords, resetCountdown, resetTotalTyped])

  return { errors, state, words, timeLeft, typed, totalTyped, restart }
}
