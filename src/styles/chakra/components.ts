import { accordionTheme } from './accordionTheme'
import { menuTheme } from './menuTheme'
import { tabsTheme } from './tabsTheme'

export const componentStyles = {
  Button: {
    variants: {
      primary: {
        border: 'solid 2px black',
        bg: 'primary.500',
        color: 'black',
        transition: 'all 200ms ease',
        boxShadow: '2px 2px 0px black',
        _hover: {
          transform: 'translateY(-4px)'
        }
      },
      searchbar: {
        border: 'solid 2px black',
        bg: 'white',
        fontWeight: '400',
        boxShadow: '2px 2px 0px black'
      },
      solid: {
        border: 'solid 2px black'
      },
      link: {
        _hover: {
          textDecorationLine: 'underline',
          textDecorationThickness: '2px'
        }
      }
    },
    defaultProps: {
      variant: 'primary'
    }
  },
  Input: {
    variants: {
      primary: {
        field: {
          border: 'solid 2px black',
          bg: 'white',
          minWidth: '350px'
        }
      }
    },
    defaultProps: {
      variant: 'primary'
    }
  },
  Select: {
    variants: {
      primary: {
        field: {
          border: 'solid 2px black',
          bg: 'white'
        }
      }
    },
    defaultProps: {
      variant: 'primary'
    }
  },
  Link: {
    variants: {
      primary: {
        _hover: {
          textDecorationLine: 'underline',
          textDecorationThickness: '2px'
        }
      }
    },
    defaultProps: {
      variant: 'primary'
    }
  },
  Tabs: tabsTheme,
  Accordion: accordionTheme,
  Menu: menuTheme
}
