import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Show,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react'
import { useEffect } from 'react'
import styles from './navbar.module.scss'
import Searchbar from './searchbar'
import Sidebar from './sidebar'

export default function Navbar() {
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

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className={styles.container}>
      <Show below="lg">
        {/* todo: create a menu dropdown or drawer */}
        <Button onClick={onOpen} variant="ghost">
          <HamburgerIcon />
        </Button>

        <Drawer size="full" placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Sidebar />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
      <Searchbar />
      <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
    </div>
  )
}
