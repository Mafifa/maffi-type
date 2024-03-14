import { faker } from '@faker-js/faker'
import { useCallback, useState } from 'react'

function generateWords (count: number): string {
  return faker.random.words(count).toLowerCase()
}

export function useWords (count: number): { words: string, UpdateWords: () => void } {
  const [words, setWords] = useState<string>(generateWords(count))

  const UpdateWords = useCallback(() => {
    setWords(generateWords(count))
  }, [count])

  return { words, UpdateWords }
}
