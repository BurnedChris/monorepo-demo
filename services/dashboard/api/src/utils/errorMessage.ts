import { SeverityLevel } from '@sentry/node'
import { logger } from 'src/lib/logger'
import Sentry from 'src/lib/sentry'

type ErrorWithMessage = {
  message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message
}

type LogMessageOptions = {
  message?: string
  exception?: any
  errorLevel: SeverityLevel
  noLogging?: boolean
}

// we may wan to try the captureMessage method uinstead
export const logMessage = ({
  exception,
  message,
  errorLevel,
  noLogging,
}: LogMessageOptions) => {
  if (exception) {
    Sentry.captureException(exception)
  } else if (message) {
    // send the error to our logging service...
    Sentry.captureMessage(message, {
      level: errorLevel,
      // extra sentry params we may want to set
      //  user: User;
      // extra: Extras;
      // contexts: Contexts;
      // tags: {
      //     [key: string]: Primitive;
      // };
      // fingerprint: string[];
      // requestSession: RequestSession;
    })
  } else {
    logger.warn('logMessage called without a message or exception')
  }

  // ...and to our pino logger
  if (noLogging) {
    switch (errorLevel) {
      case 'fatal':
        logger.fatal(message)
        break
      case 'error':
        logger.error(message)
        break
      case 'warning':
        logger.warn(message)
        break
      case 'debug':
        logger.debug(message)
        break
      case 'info':
      case 'log':
      default:
        logger.info(message)
    }
  }
}
