// banned words
const keywords = [
  'admin',
  'support',
  'contact',
  'care',
  'finance',
  'billing',
  'hello',
  'fund',
  'market',
  'help',
  'test',
  'office',
  'info',
  'sale',
  'enquir',
  'account',
  'advice',
  'event',
]

// This code checks if a email contains any of the words in the keywords array.
// The keywords array contains words that are banned from use in email.
// The function returns an error message if the name contains any of the banned words.
// The function returns no message if the name does not contain any of the banned words.
export const CheckEmailString = (email) => {
  if (
    keywords
      .map((keyword) => {
        return email.split('@')[0].toLowerCase().includes(keyword)
      })
      .includes(true)
  ) {
    return {
      code: 'banned-word',
      message:
        'For security reasons, we only allow accounts to be created from personal email addresses',
    }
  }

  const a = email.split('@')[1]
  const b = a.split('.')

  if (b.length === 1) {
    return {
      code: 'no-tld',
      message: 'It looks like you missed the end of your email address',
    }
  }

  return null
}

// This code checks if a name contains any of the words in the keywords array.
// The keywords array contains words that are banned from use in usernames.
// The function returns an error message if the name contains any of the banned words.
// The function returns no message if the name does not contain any of the banned words.
export const CheckName = (name) => {
  if (
    keywords
      .map((keyword) => {
        return name.toLowerCase().includes(keyword)
      })
      .includes(true)
  ) {
    return {
      code: 'banned-word',
      message:
        'For security reasons, we only allow accounts to be created for one person and not a team',
    }
  }
}
