import { Link } from 'expo-router'
import { StyleSheet } from 'react-native'

import { MEDIA_TYPES } from '@app/types'

import { TYPE_LABELS } from '@app/constants'

import { colors, fontSize, space } from '@app/tokens'

import { useLibraryFindAll } from '@app/api'

import { Screen } from '@/components/ui/Screen'
import ScreenTitle from '@/components/ui/ScreenTitle'

export default function Library() {
  const { data, status } = useLibraryFindAll({
    take: 20
  })

  return (
    <Screen>
      <ScreenTitle>Library</ScreenTitle>
      {MEDIA_TYPES.map(type => (
        <Link
          key={type}
          href={`/title/${type}/1`}
          style={style.item}
        >
          {TYPE_LABELS[type]}
        </Link>
      ))}
    </Screen>
  )
}

const style = StyleSheet.create({
  item: {
    color: colors.text.primary,
    fontSize: fontSize.base,
    paddingVertical: space[3]
  }
})
