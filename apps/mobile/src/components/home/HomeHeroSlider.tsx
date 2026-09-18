import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Play, Plus } from 'lucide-react-native'
import { useState } from 'react'
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  StyleSheet,
  Text,
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

import { colors, fontSize, fontWeight, space } from '@app/tokens'

import type { TitleListItemResponse } from '@app/api'

import { Button } from '../ui/Button'

import { PaginationDot } from './PaginationDot'

interface Props {
  items: TitleListItemResponse[]
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
            key={item.id}
            source={item.coverUrl}
            style={{ width, height }}
            contentFit='cover'
            transition={300}
          />
        ))}
      </Animated.ScrollView>

      <LinearGradient
        colors={[
          'rgba(2,0,3,0.7)',
          'transparent',
          'rgba(2,0,3,0.9)',
          colors.bg.base
        ]}
        locations={[0, 0.3, 0.9, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents='none'
      />

      <View
        style={styles.content}
        pointerEvents='box-none'
      >
        <Animated.View
          style={[styles.info, infoStyle]}
          pointerEvents='none'
        >
          <Text
            style={styles.name}
            numberOfLines={2}
          >
            {current?.name}
          </Text>

          <Text style={styles.genres}>Thrillers · Dramas · Action · Crime</Text>

          <Text
            style={styles.description}
            numberOfLines={2}
          >
            When an overachiving college senior makes a mistake that leads to
            the death of her family, she is forced to
          </Text>
        </Animated.View>

        <View
          style={styles.bottom}
          pointerEvents='box-none'
        >
          <View style={styles.actions}>
            <Button
              icon={Play}
              onPress={() => {}}
            >
              Watch Movie
            </Button>

            <Button
              icon={Plus}
              variant='secondary'
              onPress={() => {}}
            />
          </View>

          <View
            style={styles.dots}
            pointerEvents='none'
          >
            {items.map((item, index) => (
              <PaginationDot
                key={item.id}
                index={index}
                width={width}
                scrollX={scrollX}
              />
            ))}
          </View>
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
  genres: {
    color: colors.text.primary,
    fontSize: fontSize.sm
  },
  name: {
    color: colors.text.primary,
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3]
  },
  description: {
    color: colors.text['little-muted'],
    fontSize: fontSize.sm,
    lineHeight: 20
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: space[3]
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2]
  }
})
