import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Show, Button, useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'
import styles from './navbar.module.scss'
import Searchbar from './searchbar'

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

  return (
    <div className={styles.container}>
      <Show below='md'>
        {/* todo: create a menu dropdown or drawer */}
        <Button variant='ghost'><HamburgerIcon /></Button>
      </Show>
      <Searchbar />
      <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
    </div>
  )
}
