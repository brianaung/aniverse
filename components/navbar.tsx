import Link from 'next/link'
import styles from './navbar.module.scss'
import utilStyles from '../styles/utils.module.scss'
import Searchbar from './searchbar'

export default function Navbar() {
  return (
    <div className={styles.container}>
      {/* back to home */}
      <Link className={utilStyles.mainHeader} href="/">
        Aniverse
      </Link>

      {/* searchbar */}
      <Searchbar />

      {/* getAllTopAnime */}
      {/* getAllRecentAnime */}

    </div>
  )
}
