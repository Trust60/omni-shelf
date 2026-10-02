import { Image } from 'expo-image'
import { Check } from 'lucide-react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, radius, space } from '@app/tokens'

interface Props {
  name: string
  avatarUrl: string
  isSelected: boolean
  onPress: () => void
}
const AVATAR_SIZE = 64
const BADGE_SIZE = 22

export function FriendAvatar({ avatarUrl, isSelected, name, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.root}
    >
      <View>
        <Image
          source={avatarUrl}
          style={styles.avatar}
          transition={200}
        />

        {isSelected && (
          <View style={styles.badge}>
            <Check
              size={12}
              color={colors.text.primary}
              strokeWidth={3}
            />
          </View>
        )}
      </View>

      <Text
        style={styles.name}
        numberOfLines={1}
      >
        {name}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    width: AVATAR_SIZE + space[4],
    alignItems: 'center',
    gap: space[2]
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.bg.card
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: radius.full,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.bg.base,
    backgroundColor: colors.status.success
  },
  name: {
    color: colors.text.primary,
    fontSize: fontSize.xs
  }
})
