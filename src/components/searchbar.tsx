import { SearchIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import styles from './searchbar.module.scss'

export default function Searchbar() {
  const router = useRouter()

  const handleInput = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/anime/search/${e.target.searchbar.value}`)
  }

  return (
    <>
      <form style={{ position: 'relative' }} onSubmit={handleInput}>
        <input
          style={{ paddingLeft: '2rem' }}
          id="searchbar"
          className={styles.searchInput}
          placeholder="Search Anime, Manga"
        />
        <SearchIcon position="absolute" top="2" left="2" />
      </form>
    </>
  )
}
