import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={styles.title}>🎅 Santa Call</h1>
        <p className={styles.subtitle}>
          Haz que la magia de la Navidad cobre vida. 
          Sorprende a tus hijos con una llamada personalizada de Santa Claus.
        </p>
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
          
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="childInfo" className={styles.label}>
                Cuéntale a Santa sobre tu hijo/a
              </label>
              <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                Incluye su nombre, edad, mejores amigos, regalos que quiere, 
                y algo bueno que haya hecho este año.
              </p>
              <textarea
                id="childInfo"
                className={styles.textarea}
                placeholder="Ej: Se llama Leo, tiene 5 años. Este año aprendió a andar en bici sin rueditas. Su mejor amigo es Nico. Quiere un set de legos..."
              />
            </div>

            <button type="button" className={styles.button}>
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
