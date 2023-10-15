function toSentenceCase(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

function getUpdatedValues<T>(oldValues: T, newValues: Partial<T>) {
  const updates: Partial<T> = {}
  for (const key in newValues) {
    if (oldValues[key] !== newValues[key]) {
      updates[key] = newValues[key]
    }
  }
  return updates
}

export { toSentenceCase, getUpdatedValues }
