import { useContext } from 'react'
import { SearchContext } from '../pages/_app'
import styles from './searchbar.module.scss'

export default function Searchbar() {
  // todo: add search functionality
  // api call to getAnimeSearch with getStaticProps
  // const [query, setQuery] = useState('');
  const { setQuery } = useContext(SearchContext)

  const handleInput = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log("setting query")
    e.preventDefault()
    setQuery(e.target.foo.value)
  }

  return (
    <>
      <form onSubmit={handleInput}>
        <input id="foo" className={styles.container} placeholder="search..." />
      </form>
    </>
  )
}
