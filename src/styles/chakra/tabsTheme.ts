import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys)

const baseStyle = definePartsStyle({
  tab: {
    fontWeight: 'bold',
    borderTop: 'solid 2px black',
    borderRight: 'solid 2px black',
    borderLeft: 'solid 2px black',
    _selected: {
      borderBottom: 'none'
    }
  },
  tabpanels: {
    border: 'solid 2px black'
  }
})

export const tabsTheme = defineMultiStyleConfig({ baseStyle })
