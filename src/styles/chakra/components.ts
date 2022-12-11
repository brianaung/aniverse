import { tabsTheme } from './tabsTheme'

export const componentStyles = {
  Button: {
    variants: {
      // primary button style for the brand
      primary: {
        border: 'solid 2px black',
        bg: 'yellow.500',
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
          minWidth: '350px'
        }
      }
    },
    defaultProps: {
      variant: 'primary'
    }
  },
  Card: {
    variants: {
      primary: {
        border: 'solid 2px black',
      }
    },
    defaultProps: {
      variant: 'primary'
    }
  },
  Tabs: tabsTheme,
}
