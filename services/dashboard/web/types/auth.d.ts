import { AuthContextInterface } from '@redwoodjs/auth'
import { AuthImplementation } from '@redwoodjs/auth/dist/AuthImplementation'
import { AuthProviderProps } from '@redwoodjs/auth/dist/AuthProvider/AuthProvider'
import {
  UserResource,
  customProviderHooksProps,
  windowClerk,
} from 'src/auth/createAuth.types'

declare global {
  interface Window {
    Clerk: windowClerk
    $crisp: any
  }
}

declare module '@redwoodjs/auth' {
  export interface CurrentUser extends UserResource {}

  export function createAuthentication<
    TUser,
    TRestoreAuth,
    TLogIn,
    TLogOut,
    TSignUp,
    TForgotPassword,
    TResetPassword,
    TValidateResetToken,
    TClient
  >(
    authImplementation: AuthImplementation<
      TUser,
      TRestoreAuth,
      TLogIn,
      TLogOut,
      TSignUp,
      TForgotPassword,
      TResetPassword,
      TValidateResetToken,
      TClient
    >,
    customProviderHooks?: customProviderHooksProps
  ): {
    AuthContext: import('react').Context<
      | AuthContextInterface<
          TUser,
          TLogIn,
          TLogOut,
          TSignUp,
          TForgotPassword,
          TResetPassword,
          TValidateResetToken,
          TClient
        >
      | undefined
    >
    AuthProvider: ({
      children,
      skipFetchCurrentUser,
    }: AuthProviderProps) => JSX.Element
    useAuth: () => AuthContextInterface<
      TUser,
      TLogIn,
      TLogOut,
      TSignUp,
      TForgotPassword,
      TResetPassword,
      TValidateResetToken,
      TClient
    >
  }
}
