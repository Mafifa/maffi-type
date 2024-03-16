export function formatPercentage (porcentage: number): string {
  return porcentage.toFixed(0) + '%'
}

export function countErrors (actual: string, expected: string): number {
  const expectedCharacters = expected.split('')
  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i]
    if (actualChar !== expectedChar) {
      errors++
    }
    return errors
  }, 0)
}

export function calculateAccuracyPercentage (errors: number, total: number): number {
  if (total > 0) {
    const corrects = total - errors
    return (corrects / total) * 100
  }
  return 0
}
