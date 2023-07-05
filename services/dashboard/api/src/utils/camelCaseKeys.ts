import { camelCase, isArray, isObject, reduce } from 'lodash'

// This function takes an object and converts all its keys to camelCase
// It's used in the data layer to convert the keys from the API to camelCase

export const camelCaseKeys = (obj) => {
  if (!isObject(obj)) {
    return obj
  } else if (isArray(obj)) {
    return obj.map((v) => camelCaseKeys(v))
  }

  return reduce(
    obj,
    (r, v, k) => {
      if (k === 'metadata') {
        return {
          ...r,
          metadata: JSON.stringify(camelCaseKeys(v)),
        }
      }
      return {
        ...r,
        [camelCase(k)]: camelCaseKeys(v),
      }
    },
    {}
  )
}

// capitalise returns a string with the first letter capitalised
// if the argument is not a string, it returns an empty string
// s: string to capitalise
export const capitalise = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
