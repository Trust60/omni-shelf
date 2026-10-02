import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'

import { useAuthMobileRegister } from '@app/api'

import { saveTokens } from '@/lib/token'

import { AuthForm } from '@/components/auth/AuthForm'

export default function Register() {
  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useAuthMobileRegister({
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
      type='register'
      error={error}
      isPending={isPending}
      onSubmit={data => mutate({ data })}
    />
  )
}
