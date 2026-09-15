import { BlurView } from 'expo-blur'
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

import { colors, radius, space } from '@app/tokens'

import type { TitleListItemResponse } from '@app/api'

import { CARD_CONFIG } from './config'

interface Props {
  title: TitleListItemResponse
  onPress: () => void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function TitleCard({ onPress, title }: Props) {
  const config = CARD_CONFIG[title.type]

  const scale = useSharedValue(1)

  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const handlePressIn = () => {
    scale.set(withSpring(0.95))
  }
  const handlePressOut = () => {
    scale.set(withSpring(1))
  }

  const badgeIcon = (
    <config.icon
      size={13}
      color={colors.text.primary}
      strokeWidth={2.2}
    />
  )

  return (
    <View style={{ width: config.width, height: config.height }}>
      {config.stacked && (
        <>
          <View></View>
        </>
      )}
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.card,
          animated,
          {
            borderRadius: config.radius,
            borderWidth: config.glow ? 1 : 0,
            borderColor: config.glow ?? 'transparent'
          }
        ]}
      >
        <Image
          source={title.coverUrl}
          style={StyleSheet.absoluteFill}
          contentFit='cover'
          transition={200}
        />

        {config.spine && (
          <>
            <LinearGradient
              colors={[
                'rgba(0,0,0,0.65)',
                'rgba(255,255,255,0.12)',
                'transparent'
              ]}
            />
            <View style={styles.pages} />
          </>
        )}

        {isGlassEffectAPIAvailable() ? (
          <View style={styles.badge}>
            <GlassView
              style={styles.glass}
              glassEffectStyle='regular'
            >
              {badgeIcon}
            </GlassView>
          </View>
        ) : (
          <View style={[styles.badge, styles.fallbackShadow]}>
            <BlurView
              tint='light'
              intensity={40}
              blurMethod='dimezisBlurViewSdk31Plus'
              style={[styles.glass, styles.fallback]}
            >
              {badgeIcon}
            </BlurView>
          </View>
        )}
      </AnimatedPressable>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.bg.card
  },
  stack: {
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.bg.elevated,
    borderWidth: 1,
    borderColor: colors.border
  },
  spine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 10
  },
  pages: {
    position: 'absolute',
    right: 0,
    top: 4,
    bottom: 4,
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.18)'
  },
  badge: {
    position: 'absolute',
    left: space[2],
    bottom: space[2]
  },
  glass: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    overflow: 'hidden'
  },
  fallbackShadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6
  },
  fallback: {
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(255, 255, 255, 0.28)'
  }
})
