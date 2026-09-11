import * as SecureStore from 'expo-secure-store'

import { configureApi } from '@app/api'

configureApi({
  baseUrl: process.env.EXPO_PUBLIC_API_URL!,
  getToken: () => SecureStore.getItemAsync('accessToken')
})
