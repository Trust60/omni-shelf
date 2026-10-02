import { useQueryClient } from '@tanstack/react-query'
import { Redirect, router } from 'expo-router'
import { LogOut } from 'lucide-react-native'
import { ScrollView, Text } from 'react-native'

import { colors, fontSize, space } from '@app/tokens'

import { useAuthMobileLogout, useUserFindMe } from '@app/api'

import { clearTokens, getRefreshToken } from '@/lib/token'

import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileMenuItem } from '@/components/profile/ProfileMenuItem'
import { PROFILE_MENU } from '@/components/profile/profile-menu.data'
import { Screen } from '@/components/ui/Screen'

export default function Profile() {
  const queryClient = useQueryClient()
  const { data, isPending: isLoading, isError } = useUserFindMe()

  const { mutate: logout, isPending } = useAuthMobileLogout({
    mutation: {
      onSettled: async () => {
        await clearTokens()
        queryClient.clear()
        router.replace('/login')
      }
    }
  })

  const hangleLogout = async () => {
    const refreshToken = await getRefreshToken()
    if (!refreshToken) return
    logout({ data: { refreshToken } })
  }

  if (isLoading) {
    return (
      <Text style={{ color: colors.text.primary, fontSize: fontSize.xl }}>
        Loading...
      </Text>
    )
  }

  if (isError || !data) return <Redirect href='/login' />

  return (
    <Screen edges={[]}>
      <ProfileHeader
        name={data.data.username}
        avatarUrl={data.data.profile?.avatarUrl || ''}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: space['layout-horizontal'] }}
      >
        {PROFILE_MENU.map(item => (
          <ProfileMenuItem
            key={item.label}
            {...item}
          />
        ))}

        <ProfileMenuItem
          icon={LogOut}
          label={isPending ? 'Logging out...' : 'Login out'}
          onPress={hangleLogout}
          isLast
        />
      </ScrollView>
    </Screen>
  )
}
