import { router, useLocalSearchParams } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { Pressable, Text, View } from 'react-native'

import { FloatingButton } from '@/components/ui/FloatingButton'
import { Screen } from '@/components/ui/Screen'

export default function TitleDetail() {
  const { id, type } = useLocalSearchParams<{ id: string; type: string }>()
  return (
    <Screen>
      <FloatingButton
        onPress={() => {}}
        side='left'
        icon={ChevronLeft}
        iconOffset={-2}
      />
      <View>
        <Text>
          Тайтл {type} {id}
        </Text>
        <Pressable onPress={() => router.back()}>
          <Text>Назад</Text>
        </Pressable>
      </View>
    </Screen>
  )
}
