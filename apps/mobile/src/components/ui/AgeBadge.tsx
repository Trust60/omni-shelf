import { StyleSheet, Text, View } from 'react-native'

import { colors, radius, space } from '@app/tokens'

interface Props {
  label: string
}
export function AgeBadge({ label }: Props) {
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    borderRadius: radius.xs,
    padding: space[1],
    alignItems: 'center',
    borderColor: colors.text.muted,
    borderWidth: 0.5
  },
  label: {
    color: colors.text.primary
  }
})
