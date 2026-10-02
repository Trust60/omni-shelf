import { useLibraryFindAll } from '@app/api'

import { Screen, ScreenTitle } from '@/components/ui'

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
