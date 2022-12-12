import { HamburgerIcon, MoonIcon } from '@chakra-ui/icons'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Show,
  // useColorMode,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
// import { useEffect } from 'react'
import styles from './navbar.module.scss'
import Searchbar from './searchbar'
import Sidebar from './sidebar'

export default function Navbar() {
  const toast = useToast() // todo: tmp, remove after implementing dark mode
  /*
* todo: add dark mode
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

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className={styles.container}>
      <Show below="lg">
        <Button onClick={onOpen} variant="ghost">
          <HamburgerIcon />
        </Button>

        <Drawer size="sm" placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody display="flex" alignSelf="center" justifyContent="center" pt="5rem">
              <Sidebar />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
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
