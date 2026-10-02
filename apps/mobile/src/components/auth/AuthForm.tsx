import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { AUTH_FORM_CONTENT } from '@app/constants'

import { colors, fontSize, fontWeight, space } from '@app/tokens'

import { type TAuthForm, authSchema } from '@app/schemas'

import { ApiError } from '@app/api'

import { Button } from '../ui/Button'
import { FloatingButton } from '../ui/FloatingButton'
import { Input } from '../ui/Input'
import { Screen } from '../ui/Screen'

interface Props {
  type: keyof typeof AUTH_FORM_CONTENT
  isPending: boolean
  error: unknown
  onSubmit: (data: TAuthForm) => void
}

export function AuthForm({ error, isPending, onSubmit, type }: Props) {
  const content = AUTH_FORM_CONTENT[type]

  const { control, handleSubmit } = useForm<TAuthForm>({
    resolver: zodResolver(authSchema)
  })

  return (
    <Screen>
      <FloatingButton
        onPress={() => {
          router.push('/')
        }}
        side='left'
        icon={ChevronLeft}
        iconOffset={-2}
      />
      <View style={styles.root}>
        <View style={styles.center}>
          <Text style={styles.title}>{content.title}</Text>

          <View style={styles.form}>
            <Controller
              control={control}
              name='email'
              render={({ field, fieldState }) => (
                <Input
                  autoCapitalize='none'
                  keyboardType='email-address'
                  error={fieldState.error?.message}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder='Enter email'
                />
              )}
            />

            <Controller
              control={control}
              name='password'
              render={({ field, fieldState }) => (
                <Input
                  isPassword
                  error={fieldState.error?.message}
                  onChangeText={field.onChange}
                  value={field.value}
                  placeholder='Enter password'
                />
              )}
            />

            {error instanceof ApiError && (
              <Text style={styles.error}>{error.messages[0]}</Text>
            )}

            <Button
              size='lg'
              onPress={handleSubmit(onSubmit)}
              isDisabled={isPending}
            >
              {isPending ? content.pending : content.submit}
            </Button>
          </View>
        </View>

        <Pressable onPress={() => router.replace(content.footerHref)}>
          <Text style={styles.link}>
            {content.footerText}{' '}
            <Text style={styles.linkAccent}>{content.footerAction}</Text>
          </Text>
        </Pressable>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: space['layout-horizontal'],
    paddingBottom: space[6]
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    gap: space[10]
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    textAlign: 'center'
  },
  form: {
    gap: space[3]
  },
  error: {
    color: colors.status.error,
    fontSize: fontSize.sm,
    textAlign: 'center'
  },
  link: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    textAlign: 'center'
  },
  linkAccent: {
    fontWeight: fontWeight.semibold,
    textDecorationLine: 'underline'
  }
})
