import styles from './navbar.module.scss'
// import utilStyles from '../styles/utils.module.scss'
import Link from 'next/link'
import Searchbar from './searchbar'

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.navSelections}>
        <Link href="/">Home</Link>
        <Link href="/anime/popular">Popular</Link>
        <Link href="/anime/trending">Trending</Link>
      </div>

      <Searchbar />
    </div>
  )
}
