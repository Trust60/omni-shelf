import { Bell } from 'lucide-react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors, fontSize, fontWeight, space } from '@app/tokens'

export function HomeHeader() {
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.root, { top: insets.top + space[2] }]}>
      <Text style={styles.logo}>Omni shelf</Text>

      <Pressable hitSlop={12}>
        <Bell color={colors.text.primary} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space[5]
  },
  logo: {
    color: colors.text.primary,
    fontSize: fontSize['1.5xl'],
    fontWeight: fontWeight.bold
  }
})
