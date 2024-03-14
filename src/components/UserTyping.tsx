import { Caret } from './Caret'
import cn from 'classnames'

function Character ({ actual, expected }: { actual: string, expected: string }): JSX.Element {
  const isCorrect = actual === expected
  const isWhiteSpace = expected === ' '

  return (
    <span className={cn({
      'text-red-500': !isCorrect && !isWhiteSpace,
      'text-primary-500': isCorrect && !isWhiteSpace,
      'bg-red-500/50': !isCorrect && isWhiteSpace

    })}
    >
      {expected}
    </span >
  )
}

export function UserTypings ({
  userInput,
  className,
  words
}: {
  userInput: string
  className?: string
  words: string
}): JSX.Element {
  const typedCharacters = userInput.split('')
  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return <Character
          key={`${char}_${index}`}
          actual={char}
          expected={words[index]}
        />
      })}
      <Caret />
    </div>
  )
}
