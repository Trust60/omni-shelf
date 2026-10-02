import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DarkTheme, Stack, ThemeProvider } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { colors } from '@app/tokens'

import '@/lib/api'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000 // 1 minute
    }
  }
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider value={DarkTheme}>
          <StatusBar style='light' />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name='share/[key]'
              options={{
                presentation: 'formSheet',
                sheetAllowedDetents: [1],
                sheetGrabberVisible: true,
                contentStyle: { backgroundColor: colors.bg.base }
              }}
            />
          </Stack>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
