import { useIsBrowser } from '@redwoodjs/prerender/browserUtils'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import {
  LOCAL_STORAGE_TAG,
  MEDIA_QUERY,
  MODE_DARK,
  MODE_LIGHT,
  MODE_SYSTEM,
} from './constants'
import { colors } from './types'
import { getBindingEvents, getColorMode, getMatchMedia } from './utils'

const getInitialTheme = () => {
  if (isBrowser) {
    const persistedPreference = localStorage.getItem(LOCAL_STORAGE_TAG)
    const forceColorScheme = typeof persistedPreference === 'string'
    if (forceColorScheme) {
      return persistedPreference
    } else {
      return MODE_SYSTEM
    }
  } else return MODE_SYSTEM
}

export interface UsePerfectDarkMode {
  colorMode?: colors
  setColorMode?: (mode: colors) => void
  systemMode?: () => boolean
  forcedMode?: () => boolean
  checkMode?: () => 'system' | 'force' | undefined
  inheritedColor?: () => 'light' | 'dark'
}

const ThemeContext = createContext<UsePerfectDarkMode>({})

export const useDarkMode = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState(getInitialTheme)
  const browser = useIsBrowser()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = (): void => {
    const newValue = getColorMode(getMatchMedia())

    if (newValue === MODE_LIGHT && browser) {
      window.document.documentElement.classList.remove(MODE_DARK)
      window.document.documentElement.classList.add(MODE_LIGHT)
    }
    if (newValue === MODE_DARK && browser) {
      window.document.documentElement.classList.remove(MODE_LIGHT)
      window.document.documentElement.classList.add(MODE_DARK)
    }
  }

  useEffect(() => {
    if (MODE_SYSTEM) {
      const { bindEvent, unbindEvent } = getBindingEvents(
        getMatchMedia(),
        handleChange
      )
      bindEvent()
      return unbindEvent
    }
    return undefined
  }, [handleChange])

  const root = browser && window.document.documentElement

  const contextValue = useMemo(() => {
    function setColorMode(newValue) {
      if (newValue === MODE_LIGHT || newValue === MODE_DARK) {
        if (root.classList.contains('system-scheme')) {
          root.classList.remove('system-scheme')
          root.classList.add('force-scheme')
        }
        if (newValue === MODE_LIGHT) {
          root.classList.remove(MODE_DARK)
          root.classList.add(MODE_LIGHT)
        }
        if (newValue === MODE_DARK) {
          root.classList.remove(MODE_LIGHT)
          root.classList.add(MODE_DARK)
        }

        localStorage.setItem(LOCAL_STORAGE_TAG, newValue)

        rawSetColorMode(newValue)
      } else {
        if (root.classList.contains('force-scheme')) {
          root.classList.remove('force-scheme')
          root.classList.add('system-scheme')
        }
        const mql = browser && window.matchMedia(MEDIA_QUERY)
        const prefersDarkFromMQ = mql.matches

        localStorage.removeItem(LOCAL_STORAGE_TAG)
        root.classList.remove(MODE_LIGHT)
        root.classList.remove(MODE_DARK)
        root.classList.add(prefersDarkFromMQ ? MODE_DARK : MODE_LIGHT)
        rawSetColorMode(MODE_SYSTEM)
      }
    }

    function systemMode() {
      return root.classList.contains('system-scheme')
    }

    function forcedMode() {
      return root.classList.contains('force-scheme')
    }

    function checkMode() {
      if (root.classList.contains('force-scheme')) return 'force'
      if (root.classList.contains('system-scheme')) return 'system'

      return undefined
    }

    function inheritedColor() {
      if (root.classList.contains('light')) return 'light'
      if (root.classList.contains('dark')) return 'dark'
      return 'light'
    }

    return {
      colorMode,
      setColorMode,
      systemMode,
      forcedMode,
      checkMode,
      inheritedColor,
    }
  }, [browser, colorMode, root.classList])

  return (
    <ThemeContext.Provider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      value={contextValue}
    >
      {children}
    </ThemeContext.Provider>
  )
}
