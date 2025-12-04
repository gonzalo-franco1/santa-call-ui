import Link from 'next/link'
import Image from 'next/image'
import styles from './header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image 
          src="/images/logo.jpg" 
          alt="Santa Call Logo" 
          width={240} 
          height={80} 
          className={styles.logoImage}
        />
      </Link>
      
      <Link href="/login" className={styles.accountButton}>
        <span className={styles.icon}>👤</span>
        <span>Mi Cuenta</span>
      </Link>
    </header>
  )
}

