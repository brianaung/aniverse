import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Button, useColorMode } from '@chakra-ui/react'
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
      <Searchbar />
      <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
    </div>
  )
}
