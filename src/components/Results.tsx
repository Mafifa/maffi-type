import { motion } from 'framer-motion'
import { formatPercentage } from '../utils/Helpers'

export function Results ({
  errors,
  accuracyPercentage,
  total,
  className
}: {
  errors: number
  accuracyPercentage: number
  total: number
  className?: string
}): JSX.Element {
  const initial = { opacity: 0 }
  const animate = { opacity: 1 }
  const duration = { duration: 0.3 }

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
