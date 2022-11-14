import styles from './searchbar.module.scss'

export default function Searchbar() {
  // todo: add search functionality
  // api call to getAnimeSearch with getStaticProps

  return (
    <input className={styles.container} placeholder="search..." />
  )
}
