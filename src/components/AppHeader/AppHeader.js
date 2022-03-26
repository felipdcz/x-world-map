import useAuthContext from '@contexts/Auth'
import useAppContext from '@contexts/App'

import MainHeader from '@components/MainHeader'
import MainMenu from '@components/MainMenu'
import Button from '@components/Button'

import { MODAL_IDS } from '@lib/constants'

const AppHeader = () => {
  const { state: { token } } = useAuthContext()
  const {
    state: { isLoadingApp },
    actions: { setVisibleModal },
  } = useAppContext()

  const handleToggleVisibleModal = modalID => () => setVisibleModal(modalID)

  if (isLoadingApp) {
    return (
      <MainHeader>
        <Button onClick={handleToggleVisibleModal(MODAL_IDS.FAQ)}>
          ?
        </Button>
      </MainHeader>
    )
  }

  if (!token) {
    return (
      <MainHeader>
        <Button onClick={handleToggleVisibleModal(MODAL_IDS.JOIN_SCREEN)}>
          Join the Map
        </Button>
        <Button onClick={handleToggleVisibleModal(MODAL_IDS.FAQ)}>
          ?
        </Button>
      </MainHeader>
    )
  }

  return (
    <MainHeader>
      <MainMenu />
      <Button onClick={handleToggleVisibleModal(MODAL_IDS.FAQ)}>
        ?
      </Button>
    </MainHeader>
  )
}

export default AppHeader
