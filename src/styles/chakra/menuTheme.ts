import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  list: {
    border: 'solid 2px black',
    boxShadow: '2px 2px 0px black'
  },
  item: {
    _hover: {
      bg: 'none',
      textDecorationLine: 'underline',
      textDecorationThickness: '2px'
    }
  }
})

export const menuTheme = defineMultiStyleConfig({ baseStyle })
