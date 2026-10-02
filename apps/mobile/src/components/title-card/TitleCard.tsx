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

import type { DiscoverItemResponse } from '@app/api'

import { CARD_CONFIG } from './config'
import { MEDIA_TYPE_ICONS } from '@/constants/media-type'

interface Props {
  title: Pick<DiscoverItemResponse, 'type' | 'coverUrl'>
  onPress: () => void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const CARD_WIDTH = 114
const CARD_HEIGHT = 171
const STACK_OFFSET = 5

export function TitleCard({ onPress, title }: Props) {
  const config = CARD_CONFIG[title.type]
  const Icon = MEDIA_TYPE_ICONS[title.type]

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
    <Icon
      size={13}
      color={colors.text.primary}
      strokeWidth={2.2}
    />
  )

  return (
    <View style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
      {config.stacked && (
        <>
          <View
            style={[
              styles.stack,
              {
                right: 0,
                top: STACK_OFFSET * 2,
                bottom: STACK_OFFSET * 2,
                borderRadius: config.radius,
                opacity: 0.45
              }
            ]}
          />
          <View
            style={[
              styles.stack,
              {
                right: STACK_OFFSET,
                top: STACK_OFFSET,
                bottom: STACK_OFFSET,
                borderRadius: config.radius,
                opacity: 0.75
              }
            ]}
          />
        </>
      )}

      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.card,
          animated,
          { borderRadius: config.radius },
          config.stacked && { marginRight: STACK_OFFSET * 2 },
          config.glow && {
            borderWidth: 1,
            borderColor: config.glow,
            boxShadow: `0px 0px 14px 0px ${config.glow}`
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
                'rgba(0,0,0,0.8)',
                'rgba(255,255,255,0.22)',
                'rgba(0,0,0,0.35)',
                'transparent'
              ]}
              locations={[0, 0.5, 0.85, 1]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.spine}
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
    left: STACK_OFFSET * 2,
    backgroundColor: colors.bg.card,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border
  },
  spine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 12
  },
  pages: {
    position: 'absolute',
    right: 0,
    top: 3,
    bottom: 3,
    width: 3,
    backgroundColor: 'rgba(255,255,255,0.22)'
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
