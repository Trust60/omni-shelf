import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { Plus } from 'lucide-react-native'
import { useState } from 'react'
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  View,
  useWindowDimensions
} from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

import { TYPE_ACTION_LABELS } from '@app/constants'

import { space } from '@app/tokens'

import type { DiscoverItemResponse } from '@app/api'

import { MEDIA_TYPE_ICONS } from '@/constants/media-type'

import { HERO_GRADIENT } from '../hero/HeroBackdrop'
import { TitleInfo } from '../hero/TitleInfo'
import { Button } from '../ui/Button'

import { PaginationDot } from './PaginationDot'

interface Props {
  items: DiscoverItemResponse[]
}

export function HomeHeroSlider({ items }: Props) {
  const { width } = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const scrollX = useSharedValue(0)
  const appear = useSharedValue(1)

  const height = width * 1.25
  const current = items[index]

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollX.set(e.contentOffset.x)
  })

  const infoStyle = useAnimatedStyle(() => {
    const drag = interpolate(
      Math.abs(scrollX.get() - index * width),
      [0, width * 0.4],
      [1, 0],
      Extrapolation.CLAMP
    )

    return {
      opacity: Math.min(drag, appear.get()),
      transform: [{ translateY: (1 - appear.get()) * 10 }]
    }
  })

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width)

    if (next === index) return

    setIndex(next)
    appear.set(0)
    appear.set(withTiming(1, { duration: 280 }))
  }

  if (!current) return null

  return (
    <View style={{ height }}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={StyleSheet.absoluteFill}
      >
        {items.map(item => (
          <Image
            key={item.key}
            source={item.coverUrl}
            style={{ width, height }}
            contentFit='cover'
            transition={300}
          />
        ))}
      </Animated.ScrollView>

      <LinearGradient
        colors={HERO_GRADIENT.colors}
        locations={HERO_GRADIENT.locations}
        style={StyleSheet.absoluteFill}
        pointerEvents='none'
      />

      <View
        style={styles.content}
        pointerEvents='box-none'
      >
        <Animated.View
          style={[styles.info, infoStyle]}
          pointerEvents='box-none'
        >
          <View pointerEvents='none'>
            <TitleInfo
              name={current.name || ''}
              meta={current.genres?.slice(0, 3)}
              description='When an overachiving college senior makes a mistake that leads to
            the death of her family, she is forced to'
            />
          </View>

          <View
            style={styles.actions}
            pointerEvents='box-none'
          >
            <Button
              icon={MEDIA_TYPE_ICONS[current.type]}
              onPress={() => {
                router.push(`/title/${current.key}`)
              }}
            >
              {TYPE_ACTION_LABELS[current.type]}
            </Button>

            <Button
              icon={Plus}
              variant='secondary'
              onPress={() => {}}
            />
          </View>
        </Animated.View>
        <View
          style={styles.dots}
          pointerEvents='none'
        >
          {items.map((item, index) => (
            <PaginationDot
              key={item.key}
              index={index}
              width={width}
              scrollX={scrollX}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: space['layout-horizontal'],
    paddingBottom: space[4],
    gap: space[4]
  },
  info: {
    gap: space[4]
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    marginTop: space[3]
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: space[2]
  }
})
