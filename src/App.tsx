import { faker } from '@faker-js/faker'
import { RestartButotn } from './components/RestartButton'
import { Results } from './components/Results'
import { UserTypings } from './components/UserTyping'
import React from 'react'
import { useEngine } from './hooks/useEngine'

function GeneratedWords ({ words }: { words: string }): JSX.Element {
  return (
    <div className='text-slate-500'>{words}</div>
  )
}

function CountdownTimer ({ timeLeft }: { timeLeft: number }): JSX.Element {
  return <h2 className='text-primary-400 font-medium'>Time: {timeLeft}</h2>
}

function WordsContainer ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className='relative max-w-xl mt-3 text-3xl leading-relaxed break-all'>
      {children}
    </div>
  )
}

function App (): JSX.Element {
  const { state, words, timeLeft, typed } = useEngine()
  return (
    <div>
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords words={words} />
        <UserTypings className='absolute inset-0' words={words} userInput={typed} />
      </WordsContainer>
      <RestartButotn onRestart={() => null} className={'mx-auto mt-10 text-slate-500'} ></RestartButotn>
      <Results
        className='mt-10'
        errors={10}
        accuracyPercentage={120}
        total={200}
      />
    </div>
  )
}

export default App
