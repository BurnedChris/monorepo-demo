import { customAlphabet } from 'nanoid'

// This function generates a unique id number for a new id in the database
// The generated id string is then returned

const idNumberAlphabet = customAlphabet(
  '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
  24
)

export default idNumberAlphabet
