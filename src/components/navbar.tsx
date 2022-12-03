import styles from './navbar.module.scss'
import Searchbar from './searchbar'

export default function Navbar() {
  return (
    <div className={styles.container}>
      <Searchbar />
    </div>
  )
}
