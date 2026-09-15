import { BlurView } from 'expo-blur'
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect'
import type { LucideIcon } from 'lucide-react-native'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors, radius, space } from '@app/tokens'

interface Props {
  icon: LucideIcon
  onPress: () => void
  side: 'left' | 'right'
  iconOffset?: number
}

export function FloatingButton({
  icon: Icon,
  onPress,
  side,
  iconOffset
}: Props) {
  const insets = useSafeAreaInsets()

  const position = [
    styles.root,
    { top: insets.top + space[2] },
    side == 'left' ? { left: space[4] } : { right: space[4] }
  ]

  const content = (
    <Icon
      size={26}
      color={colors.text.primary}
      style={iconOffset ? { marginLeft: iconOffset } : undefined}
    />
  )

  if (!isGlassEffectAPIAvailable()) {
    return (
      <View style={[position, styles.fallbackShadow]}>
        <BlurView
          tint='light'
          intensity={40}
          blurMethod='dimezisBlurViewSdk31Plus'
          style={styles.fallback}
        >
          <Pressable
            hitSlop={12}
            onPress={onPress}
            style={({ pressed }) => [
              styles.press,
              pressed && styles.fallbackPressed
            ]}
          >
            {content}
          </Pressable>
        </BlurView>
      </View>
    )
  }

  return (
    <View style={position}>
      <GlassView
        style={styles.glass}
        glassEffectStyle='clear'
        isInteractive
      >
        <Pressable
          hitSlop={12}
          style={styles.press}
          onPress={onPress}
        >
          {content}
        </Pressable>
      </GlassView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: radius.full
  },
  glass: {
    flex: 1,
    borderRadius: radius.full,
    overflow: 'hidden'
  },
  press: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fallbackShadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6
  },
  fallback: {
    flex: 1,
    borderRadius: radius.full,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(255, 255, 255, 0.28)'
  },
  fallbackPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)'
  }
})
