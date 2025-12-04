import Link from 'next/link'
import styles from './header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <span>🎅</span>
        <span>Santa Call</span>
      </Link>
      
      <Link href="/login" className={styles.accountButton}>
        <span className={styles.icon}>👤</span>
        <span>Mi Cuenta</span>
      </Link>
    </header>
  )
}

