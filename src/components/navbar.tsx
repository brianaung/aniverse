import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Button, useColorMode } from '@chakra-ui/react'
import styles from './navbar.module.scss'
import Searchbar from './searchbar'

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <div className={styles.container}>
      <Searchbar />
      <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
    </div>
  )
}
