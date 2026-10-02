import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'

import { useAuthMobileLogin } from '@app/api'

import { saveTokens } from '@/lib/token'

import { AuthForm } from '@/components/auth/AuthForm'

export default function Login() {
  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useAuthMobileLogin({
    mutation: {
      onSuccess: async ({ data: { accessToken, refreshToken } }) => {
        await saveTokens(accessToken, refreshToken)
        queryClient.clear()
        router.replace('/')
      }
    }
  })
  return (
    <AuthForm
      type='login'
      error={error}
      isPending={isPending}
      onSubmit={data => mutate({ data })}
    />
  )
}
