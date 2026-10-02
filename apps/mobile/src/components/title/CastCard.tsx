import { Image } from 'expo-image'
import { StyleSheet, Text, View } from 'react-native'

import { colors, fontSize, fontWeight, radius, space } from '@app/tokens'

interface Props {
  name: string
  photoUrl: string
}

const SIZE = 80

export function CastCard({ name, photoUrl }: Props) {
  return (
    <View style={styles.root}>
      <Image
        source={photoUrl}
        style={styles.photo}
        contentFit='cover'
        transition={200}
      />
      <Text
        style={styles.name}
        numberOfLines={2}
      >
        {name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: SIZE,
    alignItems: 'center',
    gap: space[2]
  },
  photo: {
    width: SIZE,
    height: SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.bg.card
  },
  name: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    textAlign: 'center'
  }
})
