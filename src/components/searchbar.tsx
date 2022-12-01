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
      <form onSubmit={handleInput}>
        <input id="searchbar" className={styles.searchInput} placeholder="search..." />
      </form>
    </>
  )
}
