import styles from './layout.module.scss'
import utilStyles from '../styles/utils.module.scss'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={utilStyles.mainHeader}>Aniverse</header>
      <main>{children}</main>
    </div>
  )
}
