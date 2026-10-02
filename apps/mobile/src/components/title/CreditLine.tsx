import { StyleSheet, Text } from 'react-native'

import { colors, fontSize, fontWeight } from '@app/tokens'

interface Props {
  label: string
  value: string
}

export function CreditLine({ label, value }: Props) {
  if (!value) return null

  return (
    <Text style={styles.line}>
      <Text style={styles.label}>{label}: </Text>
      {value}
    </Text>
  )
}

const styles = StyleSheet.create({
  line: {
    color: colors.text['little-muted'],
    fontSize: fontSize.sm
  },
  label: {
    color: colors.text.primary,
    fontWeight: fontWeight.medium
  }
})
