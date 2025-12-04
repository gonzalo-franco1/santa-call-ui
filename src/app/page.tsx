'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  const [childName, setChildName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Save form data to localStorage to retrieve it after login/signup
    if (typeof window !== 'undefined') {
      localStorage.setItem('santaCall_formData', JSON.stringify({
        childName,
        phoneNumber,
        message
      }))
    }

    router.push('/login?redirect=create')
  }

  return (
    <main className={styles.main}>
      {/* Hero with Background Image */}
      <div className={styles.heroWrapper}>
        <Image 
          src="/images/santa_claus_and_children_ultrawide.png" 
          alt="Santa Claus con niños celebrando la Navidad" 
          fill
          className={styles.heroBackgroundImage}
          quality={100}
          priority
        />
        
        <div className={styles.heroOverlay}>
          <div className={styles.heroLogoWrapper}>
            <Image 
              src="/images/logo.jpg" 
              alt="Santa Call Logo" 
              width={200} 
              height={200} 
              className={styles.heroLogo}
              priority
            />
          </div>
          <div className={styles.heroContentBox}>
            <p className={styles.subtitle}>
              Haz que la magia de la Navidad cobre vida. 
              Sorprende a tus hijos con una llamada personalizada de Santa Claus.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        
        {/* Features */}
        <div className={styles.features}>
          <div>
            <div className={styles.featureIcon}>📝</div>
            <h3>Tú nos cuentas</h3>
            <p>Cuéntanos los logros y detalles especiales de tu hijo este año.</p>
          </div>
          <div>
            <div className={styles.featureIcon}>📞</div>
            <h3>Santa llama</h3>
            <p>Recibe una llamada mágica donde Santa menciona esos detalles.</p>
          </div>
          <div>
            <div className={styles.featureIcon}>✨</div>
            <h3>Magia pura</h3>
            <p>Una experiencia inolvidable que mantendrá viva la ilusión.</p>
          </div>
        </div>

        {/* Form Section */}
        <div className={styles.card}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--santa-red)' }}>
            Configura tu Llamada Mágica
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                <label htmlFor="childName" className={styles.label}>
                  Nombre del niño/a
                </label>
                <input
                  id="childName"
                  type="text"
                  className={styles.input}
                  placeholder="Ej: Leo"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                <label htmlFor="phoneNumber" className={styles.label}>
                  Teléfono a llamar
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  className={styles.input}
                  placeholder="+34 600 000 000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="childInfo" className={styles.label}>
                Cuéntale a Santa sobre tu hijo/a
              </label>
              <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Incluye su edad, mejores amigos, regalos que quiere, 
                y algo bueno que haya hecho este año.
              </p>
              <textarea
                id="childInfo"
                className={styles.textarea}
                placeholder="Ej: Tiene 5 años. Este año aprendió a andar en bici sin rueditas. Su mejor amigo es Nico. Quiere un set de legos..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className={styles.button}>
              Programar Llamada con Santa 🎄
            </button>
          </form>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Santa Call - Hecho con ❤️ y magia navideña</p>
      </footer>
    </main>
  )
}
