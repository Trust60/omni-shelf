import { StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, fontWeight, space } from '@app/tokens'

import type { Platforms } from '@/lib/title-metadata'

import { PlatformIcon } from '@/components/ui/PlatformIcon'

interface Props {
  platforms: Platforms
}

export function PlatformsLine({ platforms }: Props) {
  const { families, other } = platforms
  const count = families.length + other.length
  if (!count) return null

  return (
    <View style={styles.line}>
      <Text style={styles.label}>{count > 1 ? 'Platforms' : 'Platform'}:</Text>

      {families.map(family => (
        <PlatformIcon
          key={family}
          family={family}
          color={colors.text['little-muted']}
        />
      ))}

      {!!other.length && <Text style={styles.text}>{other.join(', ')}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: space[2]
  },
  label: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium
  },
  text: {
    color: colors.text['little-muted'],
    fontSize: fontSize.sm
  }
})
