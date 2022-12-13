import { HamburgerIcon, MoonIcon } from '@chakra-ui/icons'
import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Show,
  // useColorMode,
  useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
// import { useEffect } from 'react'
import MyLink from './myLink'
import styles from './navbar.module.scss'
import Searchbar from './searchbar'

export default function Navbar() {
  const toast = useToast() // todo: tmp, remove after implementing dark mode
  /*
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    const handleColorSwitch = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault()
        toggleColorMode()
      }
    }

    document.addEventListener('keydown', handleColorSwitch)

    return function cleanup() {
      document.removeEventListener('keydown', handleColorSwitch)
    }
  }, [toggleColorMode])
  */

  const router = useRouter()
  const handleClick = (url: string) => {
    router.push(`${url}`)
  }

  return (
    <div className={styles.container}>
      <Show below="md">
        <Menu>
          <MenuButton>
            <HamburgerIcon />
          </MenuButton>
          <MenuList>
            <MenuGroup title="ANIME">
              <MenuItem onClick={() => handleClick('/anime/popular')}>Most Popular</MenuItem>
              <MenuItem onClick={() => handleClick('/anime/trending')}>Trending Now</MenuItem>
              {/* todo: make a seperate genres list page for mobile version (accordion in desktop) */}
              <MenuItem>Genres [WIP]</MenuItem>
            </MenuGroup>
            <MenuGroup title="MANGA">
              <MenuItem onClick={() => handleClick('/')}>Dummy</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Show>

      <MyLink onClick={null} href="/">
        <Image
          src="/satoru-gojo.svg"
          w="48px"
          h="48"
          alt="satoru"
          transition="all 200ms ease"
          _hover={{ transform: 'translateY(-2px)' }}
        />
      </MyLink>

      <Searchbar />

      {/*<Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>*/}
      <Button
        onClick={() =>
          toast({
            title: 'SIKE!',
            description: 'There is no dark mode, yet. So keep the room well lit and watch from a distance, okay?',
            status: 'error',
            duration: 8000,
            isClosable: true,
            containerStyle: {
              border: 'solid 1px black',
              borderRadius: '8px'
            }
          })
        }>
        <MoonIcon />
      </Button>
    </div>
  )
}
