import { LinearGradient } from 'expo-linear-gradient'
import { router, useLocalSearchParams } from 'expo-router'
import { Bookmark, ChevronLeft, Plus, Share, Star } from 'lucide-react-native'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'

import { CREATOR_ROLE_LABELS, getAgeRatingLabel } from '@app/constants'

import { colors, space } from '@app/tokens'

import { CreatorRole, useDiscoverFindByKey } from '@app/api'

import { getMetadataLines, getPlatforms } from '@/lib/title-metadata'

import { HeroBackdrop } from '@/components/hero/HeroBackdrop'
import { TitleInfo } from '@/components/hero/TitleInfo'
import { SectionCarousel } from '@/components/section-carousel/SectionCarousel'
import { TitleCard } from '@/components/title-card/TitleCard'
import { CastCard } from '@/components/title/CastCard'
import { CreditLine } from '@/components/title/CreditLine'
import { PlatformsLine } from '@/components/title/PlatformsLine'
import {
  ActionButton,
  AgeBadge,
  Button,
  FloatingButton,
  Screen
} from '@/components/ui'

const OVERLAP = space[20]
const CAST_LIMIT = 15

export default function TitleDetail() {
  const { key } = useLocalSearchParams<{ key: string }>()
  const { width } = useWindowDimensions()
  const { data, isPending } = useDiscoverFindByKey(key)

  const heroHeight = width * 1.2
  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollY.set(e.contentOffset.y)
  })

  const heroStyle = useAnimatedStyle(() => {
    const y = scrollY.get()

    return {
      opacity: interpolate(y, [0, heroHeight], [1, 0.4], 'clamp'),
      transform: [
        {
          translateY: interpolate(
            y,
            [-heroHeight, 0, heroHeight],
            [heroHeight / 2, 0, -heroHeight * 0.3],
            'clamp'
          )
        },
        { scale: interpolate(y, [-heroHeight, 0], [2, 1], 'clamp') }
      ]
    }
  })

  if (isPending || !data || data.status !== 200) return <Screen />

  const title = data.data

  const year = title.releaseDate
    ? new Date(title.releaseDate).getFullYear()
    : null

  const ageRating = getAgeRatingLabel(title.ageRating)

  const meta = [
    ageRating && <AgeBadge label={ageRating} />,
    year,
    ...title.genres.slice(0, 3)
  ]

  const joinNames = (people: { name: string }[]) =>
    people
      .slice(0, 3)
      .map(person => person.name)
      .join(', ')

  const metadataLines = getMetadataLines(title.metadata)

  const castWithPhotos = title.cast
    .filter((person): person is typeof person & { photoUrl: string } =>
      Boolean(person.photoUrl)
    )
    .slice(0, CAST_LIMIT)

  const creatorLines = (Object.keys(CREATOR_ROLE_LABELS) as CreatorRole[]).map(
    role => {
      const people = title.creators.filter(c => c.role === role)
      const label = CREATOR_ROLE_LABELS[role]
      return {
        key: role,
        label: people.length > 1 ? label.many : label.one,
        value: joinNames(people)
      }
    }
  )

  const creditLines = [
    ...(castWithPhotos.length
      ? []
      : [{ key: 'cast', label: 'Cast', value: joinNames(title.cast) }]),
    ...creatorLines
  ].filter(line => line.value)

  return (
    <Screen edges={[]}>
      <FloatingButton
        onPress={() => router.back()}
        side='left'
        icon={ChevronLeft}
        iconOffset={-2}
      />

      <Animated.View
        style={[styles.hero, heroStyle]}
        pointerEvents='none'
      >
        <HeroBackdrop
          coverUrl={title.coverUrl}
          height={heroHeight}
        />
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: heroHeight - OVERLAP }} />

        <View style={styles.body}>
          <LinearGradient
            colors={['transparent', colors.bg.base]}
            style={styles.bodyFade}
            pointerEvents='none'
          />

          <View style={styles.content}>
            <TitleInfo
              name={title.name}
              meta={meta}
              description={title.description}
            />
            <Button
              icon={Plus}
              size='lg'
              onPress={() => {}}
            >
              Add to library
            </Button>
            <PlatformsLine platforms={getPlatforms(title.metadata)} />
            {metadataLines.map(line => (
              <CreditLine
                key={line.key}
                label={line.label}
                value={line.value}
              />
            ))}
            {!!creditLines.length &&
              creditLines.map(line => (
                <CreditLine
                  key={line.key}
                  label={line.label}
                  value={line.value}
                />
              ))}
          </View>

          <View style={styles.actions}>
            <ActionButton
              icon={Bookmark}
              label='Watchlist'
              onPress={() => {}}
            />
            <ActionButton
              icon={Star}
              label='Rate'
              onPress={() => {}}
            />
            <ActionButton
              icon={Share}
              label='Share'
              onPress={() => {
                router.push(`/share/${title.key}`)
              }}
            />
          </View>

          {!!title.similar.length && (
            <SectionCarousel title='You may also like'>
              {title.similar.map(item => (
                <TitleCard
                  key={item.key}
                  title={item}
                  onPress={() => router.push(`/title/${item.key}`)}
                />
              ))}
            </SectionCarousel>
          )}

          {!!castWithPhotos.length && (
            <SectionCarousel title='Top cast'>
              {castWithPhotos.map(person => (
                <CastCard
                  key={person.name}
                  name={person.name}
                  photoUrl={person.photoUrl}
                />
              ))}
            </SectionCarousel>
          )}
        </View>
      </Animated.ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  body: {
    backgroundColor: colors.bg.base,
    paddingBottom: space[6]
  },
  bodyFade: {
    position: 'absolute',
    top: -OVERLAP,
    left: 0,
    right: 0,
    height: OVERLAP
  },
  content: {
    marginTop: -space[20],
    paddingHorizontal: space['layout-horizontal'],
    gap: space[4]
  },
  actions: {
    flexDirection: 'row',
    marginTop: space[6]
  }
})
