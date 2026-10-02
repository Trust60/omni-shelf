import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, space } from '@app/tokens'

import { useDiscoverFindByKey } from '@app/api'

import { SectionCarousel } from '@/components/section-carousel/SectionCarousel'
import { FriendAvatar } from '@/components/title/share/FriendAvatar'
import { SHARE_FRIENDS } from '@/components/title/share/share-friends.data'
import { Button, Input, Screen, ScreenTitle } from '@/components/ui'

export default function ShareSheet() {
  const { key } = useLocalSearchParams<{ key: string }>()
  const { data, isPending } = useDiscoverFindByKey(key)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  if (isPending || !data || data.status !== 200) return <Screen />

  const title = data.data
  const year = title.releaseDate
    ? new Date(title.releaseDate).getFullYear()
    : null

  const heading = [title.name, year].filter(Boolean).join(' ')

  const toggleFriend = (id: string) => {
    setSelectedIds(ids =>
      ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]
    )
  }

  const recipients = SHARE_FRIENDS.filter(friend =>
    selectedIds.includes(friend.id)
  )
    .map(friend => friend.name)
    .join(', ')

  return (
    <View
      style={styles.root}
      collapsable={false}
    >
      <View style={styles.inset}>
        <ScreenTitle>Share with friends</ScreenTitle>
        <View style={styles.divider} />
      </View>

      <View collapsable={false}>
        <SectionCarousel title={heading}>
          {SHARE_FRIENDS.map(friend => (
            <FriendAvatar
              key={friend.id}
              name={friend.name}
              avatarUrl={friend.avatarUrl}
              isSelected={selectedIds.includes(friend.id)}
              onPress={() => toggleFriend(friend.id)}
            />
          ))}
        </SectionCarousel>
      </View>

      <View style={[styles.inset, styles.form]}>
        <Text style={styles.to}>To: {recipients}</Text>

        <Input
          placeholder='Check this out!'
          multiline
        />

        <View style={styles.divider} />

        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              variant='secondary'
              onPress={router.back}
            >
              Cancel
            </Button>
          </View>
          <View style={styles.button}>
            <Button onPress={router.back}>Send</Button>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: space[6],
    paddingBottom: space[8]
  },
  inset: {
    paddingHorizontal: space['layout-horizontal'],
    paddingTop: space[6]
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border
  },
  form: {
    gap: space[4]
  },
  to: {
    color: colors.text.muted,
    fontSize: fontSize.sm
  },
  buttons: {
    flexDirection: 'row',
    gap: space[3]
  },
  button: {
    flex: 1
  }
})
