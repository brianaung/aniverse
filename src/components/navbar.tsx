import styles from './navbar.module.scss'
import utilStyles from '../styles/utils.module.scss'
import Link from 'next/link'
import Searchbar from './searchbar'

export default function Navbar() {
  return (
    <div className={styles.container}>
      {/* back to home */}
      <Link className={utilStyles.mainHeader} href="/">
        どやなル
      </Link>

      {/* getAllTopAnime */}
      {/* getAllRecentAnime */}
      <div className={styles.navSelections}>
        <Link href="/">Trending</Link>
        <Link href="/">Recent</Link>
      </div>

      <Searchbar />
    </div>
  )
}
