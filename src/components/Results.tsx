import { motion } from 'framer-motion'
import { formatPercentage } from '../utils/Helpers'
import { State } from '../hooks/useEngine'

export function Results ({
  state,
  errors,
  accuracyPercentage,
  total,
  className
}: {
  state: State
  errors: number
  accuracyPercentage: number
  total: number
  className?: string
}): JSX.Element | null {
  const initial = { opacity: 0 }
  const animate = { opacity: 1 }
  const duration = { duration: 0.3 }

  if (state !== 'finish') {
    return null
  }

  return (
    <motion.ul className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}>
      <motion.li
        animate={animate}
        transition={{ ...duration, delay: 0 }}
        initial={initial}
        className='text-xl font-semibold'>
        Results
      </motion.li>
      <motion.li
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
        initial={initial}>
        Acuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        animate={animate}
        transition={{ ...duration, delay: 1 }}
        initial={initial}
        className="text-red-500">
        Erros : {errors}
      </motion.li>
      <motion.li
        animate={animate}
        transition={{ ...duration, delay: 1.4 }}
        initial={initial}
      >
        Typed:{total}
      </motion.li>
    </motion.ul>
  )
}
