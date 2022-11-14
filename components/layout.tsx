import styles from './layout.module.scss'
// import utilStyles from '../styles/utils.module.scss'
import Navbar from './navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Navbar />
      {/*<header className={utilStyles.mainHeader}>Aniverse</header>*/}
      <main>{children}</main>
    </div>
  )
}
