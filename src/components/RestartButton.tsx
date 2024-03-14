import { useRef } from 'react'

export function RestartButotn ({ onRestart: handleRestart, className = '' }: { onRestart: () => void, className?: string }): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const handleClick = (): void => {
    buttonRef.current?.blur()
    handleRestart()
  }

  return (
    <button onClick={handleClick} className={`text-white block rounded px-8 py-2 hover:bg-slate-700/50 ${className}`}>
      RESTART
    </button>
  )
}
