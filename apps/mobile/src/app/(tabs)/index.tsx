import { router } from 'expo-router'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

import { space } from '@app/tokens'

import { useDiscoverGetTrending } from '@app/api'

import { HomeHeader } from '@/components/home/HomeHeader'
import { HomeHeroSlider } from '@/components/home/HomeHeroSlider'
import { SectionCarousel } from '@/components/section-carousel/SectionCarousel'
import { TitleCard } from '@/components/title-card/TitleCard'
import { Screen } from '@/components/ui/Screen'

export default function Index() {
  const scrollY = useSharedValue(0)
  const { data, isPending } = useDiscoverGetTrending({ take: 20 })

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollY.set(e.contentOffset.y)
  })

  const items = data?.data ?? []
  const heroItems = items.slice(0, 5)
  const topPicksItems = items.slice(5, 12)
  const trandingItems = items.slice(12)

  return (
    <Screen edges={[]}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: space[20] }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {!!heroItems.length && <HomeHeroSlider items={heroItems} />}

        <SectionCarousel
          title='Top pics for you'
          onPressArrow={() => {}}
        >
          {topPicksItems.map(title => (
            <TitleCard
              key={title.key}
              title={title}
              onPress={() => router.push(`/title/${title?.key}`)}
            />
          ))}
        </SectionCarousel>

        <SectionCarousel title='Popular'>
          {trandingItems.map(title => (
            <TitleCard
              key={title.key}
              title={title}
              onPress={() => router.push(`/title/${title?.key}`)}
            />
          ))}
        </SectionCarousel>
      </Animated.ScrollView>

      <HomeHeader scrollY={scrollY} />
    </Screen>
  )
}
