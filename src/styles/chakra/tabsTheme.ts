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
      borderBottom: 'none',
      bg: 'white'
    }
  },
  // i cannot border: 'none' this section
  tablist: {
    borderColor: 'black'
  },
  tabpanels: {
    border: 'solid 2px black',
    // this is clashing with tablist border-bottom
    borderTop: 'none',
    bg: 'white'
  }
})

export const tabsTheme = defineMultiStyleConfig({ baseStyle })
