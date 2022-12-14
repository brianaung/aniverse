import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(accordionAnatomy.keys)

const baseStyle = definePartsStyle({
  panel: {
    bg: 'white',
    border: 'solid 2px black'
  },
  container: {
    border: 'none'
  }
})

export const accordionTheme = defineMultiStyleConfig({ baseStyle })
