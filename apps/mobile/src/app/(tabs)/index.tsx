import { Play, Plus } from 'lucide-react-native'
import { StyleSheet } from 'react-native'

import { HomeHeader } from '@/components/HomeHeader'
import { Button } from '@/components/ui/Button'
import { Screen } from '@/components/ui/Screen'

export default function Index() {
  return (
    <Screen>
      <HomeHeader />

      <Button
        icon={Play}
        onPress={() => {}}
      >
        Watch Movie
      </Button>

      <Button
        icon={Plus}
        variant='secondary'
        onPress={() => {}}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({})
