import { SearchIcon } from '@chakra-ui/icons'
import { Kbd, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import styles from './searchbar.module.scss'

export default function Searchbar() {
  const router = useRouter()
  const searchBoxRef = useRef<HTMLInputElement>(null)

  const handleInput = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/anime/search/${e.target.searchbar.value}`)
  }

  // focus to search input box on keydown
  useEffect(() => {
    const handleFocus = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault()
        searchBoxRef.current?.focus();
      }

    }
    // todo: learn more abt vanilla js
    document.addEventListener('keydown', handleFocus);
    return function cleanup() {
      document.removeEventListener('keydown', handleFocus);
    }
  },[])

  return (
    <>
      <form style={{ position: 'relative' }} onSubmit={handleInput}>
        <input
          style={{ paddingLeft: '2rem' }}
          id="searchbar"
          className={styles.searchInput}
          placeholder="Search Anime, Manga"
          ref={searchBoxRef}
        />
        <span style={{position:'absolute',right:'1%',top:'2%'}}><Kbd><Text as='abbr' title='control'>ctrl</Text></Kbd> + <Kbd>K</Kbd></span>
        <SearchIcon position="absolute" top="2" left="2" />
      </form>
    </>
  )
}
