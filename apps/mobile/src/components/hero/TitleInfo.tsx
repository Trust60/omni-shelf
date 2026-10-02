import { Fragment, type ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, fontWeight, space } from '@app/tokens'

interface Props {
  name: string
  meta?: ReactNode[]
  description: string | null
  descriptionsLines?: number
}
export function TitleInfo({
  name,
  meta = [],
  description,
  descriptionsLines = 2
}: Props) {
  const metaItems = meta.filter(
    item => item !== null && item !== undefined && item !== false && item !== ''
  )

  return (
    <View style={styles.root}>
      <Text
        style={styles.name}
        numberOfLines={2}
      >
        {name}
      </Text>
      {metaItems.length > 0 && (
        <View style={styles.metaRow}>
          {metaItems.map((item, index) => (
            <Fragment key={index}>
              {index > 0 && <Text style={styles.meta}>·</Text>}
              {typeof item === 'string' || typeof item === 'number' ? (
                <Text style={styles.meta}>{item}</Text>
              ) : (
                item
              )}
            </Fragment>
          ))}
        </View>
      )}
      {!!description && (
        <Text
          style={styles.description}
          numberOfLines={descriptionsLines}
        >
          {description}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: space[2]
  },
  name: {
    fontSize: fontSize['3xl'],
    color: colors.text.primary,
    fontWeight: fontWeight.bold
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: space[1]
  },
  meta: {
    fontSize: fontSize.sm,
    color: colors.text.primary
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.text['little-muted'],
    lineHeight: 20
  }
})
