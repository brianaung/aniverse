import Link from 'next/link'
import styles from './myLink.module.scss'

export default function MyLink({ onClick, href, children }: { onClick: any; href: string; children: React.ReactNode }) {
  return (
    <Link className={styles.link} href={href} onClick={onClick}>
      {children}
    </Link>
  )
}
