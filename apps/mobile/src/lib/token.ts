import * as SecureStore from 'expo-secure-store'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@app/constants'

export const saveTokens = async (access: string, refresh: string) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN, access)
  await SecureStore.setItemAsync(REFRESH_TOKEN, refresh)
}

export const clearTokens = async () => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN)
  await SecureStore.deleteItemAsync(REFRESH_TOKEN)
}

export const getAccessToken = async () => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN)
}

export const getRefreshToken = async () => {
  return await SecureStore.getItemAsync(REFRESH_TOKEN)
}
