import { Smartphone } from 'lucide-react-native'
import type { FC } from 'react'
import type { SvgProps } from 'react-native-svg'

import type { PlatformFamily } from '@/lib/title-metadata'

import Android from '@/assets/icons/platforms/android.svg'
import Atari from '@/assets/icons/platforms/atari.svg'
import Commodore from '@/assets/icons/platforms/commodore.svg'
import Linux from '@/assets/icons/platforms/linux.svg'
import Mac from '@/assets/icons/platforms/mac.svg'
import Nintendo from '@/assets/icons/platforms/nintendo.svg'
import Pc from '@/assets/icons/platforms/pc.svg'
import PlayStation from '@/assets/icons/platforms/playstation.svg'
import Sega from '@/assets/icons/platforms/sega.svg'
import Xbox from '@/assets/icons/platforms/xbox.svg'

const BRAND_ICONS: Record<Exclude<PlatformFamily, 'ios'>, FC<SvgProps>> = {
  pc: Pc,
  playstation: PlayStation,
  xbox: Xbox,
  nintendo: Nintendo,
  android: Android,
  mac: Mac,
  linux: Linux,
  sega: Sega,
  atari: Atari,
  commodore: Commodore
}

interface Props {
  family: PlatformFamily
  color: string
  size?: number
}

export function PlatformIcon({ family, color, size = 14 }: Props) {
  if (family === 'ios') {
    return (
      <Smartphone
        size={size}
        color={color}
        strokeWidth={2.5}
      />
    )
  }

  const Icon = BRAND_ICONS[family]

  return (
    <Icon
      width={size}
      height={size}
      fill={color}
    />
  )
}
