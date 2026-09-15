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
    </Screen>
  )
}
