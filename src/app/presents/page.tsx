'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './secret.module.css'

const presents = [
  { 
    name: 'Nintendo Switch con el Mario Kart', 
    emoji: '🎮',
    description: 'Para carreras épicas con la familia'
  },
  { 
    name: 'Lego de Dinosaurio', 
    emoji: '🦖',
    description: 'Construye tu propio T-Rex'
  },
  { 
    name: 'Muchos Créditos de Cursor', 
    emoji: '💻',
    description: 'Para programar como un pro'
  },
]

export default function SecretPage() {
  const router = useRouter()
  const [showPresents, setShowPresents] = useState(false)
  const [revealedIndex, setRevealedIndex] = useState(-1)

  useEffect(() => {
    // Start animation after mount
    const timer = setTimeout(() => {
      setShowPresents(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showPresents && revealedIndex < presents.length - 1) {
      const timer = setTimeout(() => {
        setRevealedIndex(prev => prev + 1)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [showPresents, revealedIndex])

  // Secret key to go back (press Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])

  return (
    <main className={styles.main}>
      {/* Floating snowflakes */}
      <div className={styles.snowflakes}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.snowflake} style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}>❄</div>
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.santaEmoji}>🎅</div>
          <h1 className={styles.title}>
            Lista de Santa
          </h1>
          <p className={styles.subtitle}>
            ¡Ho Ho Ho! Estos son los regalos que Jorge ha pedido...
          </p>
        </div>

        <div className={styles.presentsContainer}>
          {presents.map((present, index) => (
            <div 
              key={index}
              className={`${styles.presentCard} ${revealedIndex >= index ? styles.revealed : ''}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className={styles.presentEmoji}>{present.emoji}</div>
              <div className={styles.presentInfo}>
                <h3 className={styles.presentName}>{present.name}</h3>
                <p className={styles.presentDescription}>{present.description}</p>
              </div>
              <div className={styles.ribbon}>🎁</div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.magicText}>✨ Santa está preparando todo ✨</div>
          <p className={styles.hint}>Presiona ESC para volver</p>
        </div>
      </div>
    </main>
  )
}

