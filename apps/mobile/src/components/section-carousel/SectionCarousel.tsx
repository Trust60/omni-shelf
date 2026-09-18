import { ChevronRight } from 'lucide-react-native'
import type { ReactNode } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, fontWeight, space } from '@app/tokens'

interface Props {
  title: string
  children: ReactNode
  onPressArrow?: () => void
}

export function SectionCarousel({ children, title, onPressArrow }: Props) {
  return (
    <View style={styles.root}>
      <Pressable
        onPress={onPressArrow}
        disabled={!onPressArrow}
        style={styles.header}
      >
        <Text style={styles.title}>{title}</Text>
        {!!onPressArrow && (
          <ChevronRight
            size={26}
            color={colors.text.primary}
          />
        )}
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {children}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    gap: space[3],
    marginTop: space[5]
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: space['layout-horizontal'],
    marginBottom: space[2]
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold
  },
  scroll: {
    paddingHorizontal: space['layout-horizontal'],
    gap: space[3]
  }
})
