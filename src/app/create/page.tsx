'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import styles from '../page.module.css'

interface FormData {
  childName: string
  phoneNumber: string
  email: string
  message: string
  scheduledDateTime?: string
}

export default function CreateCallPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'no-data'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData | null>(null)
  const router = useRouter()
  const supabase = createClient()

  // Secret key binding: press "p" to access the presents page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'p') {
        router.push('/presents')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])

  useEffect(() => {
    const createSantaCall = async () => {
      try {
        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user) {
          router.push('/login?redirect=create')
          return
        }

        // Get form data from localStorage
        const storedData = localStorage.getItem('santaCall_formData')
        
        if (!storedData) {
          setStatus('no-data')
          return
        }

        const parsedData: FormData = JSON.parse(storedData)
        setFormData(parsedData)

        // Insert into santa_calls table
        const { error: insertError } = await supabase
          .from('santa_calls')
          .insert({
            user_id: user.id,
            child_name: parsedData.childName,
            child_info: parsedData.message,
            phone_number: parsedData.phoneNumber,
            father_email: parsedData.email,
            scheduled_at: parsedData.scheduledDateTime || null,
          })

        if (insertError) {
          console.error('Error inserting santa call:', insertError)
          setError(insertError.message)
          setStatus('error')
          return
        }

        // Trigger the Santa call via HappyRobot API
        const triggerResponse = await fetch('/api/trigger-call', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            child_name: parsedData.childName,
            child_info: parsedData.message,
            phone_number: parsedData.phoneNumber,
            scheduled_date: parsedData.scheduledDateTime,
          }),
        })

        if (!triggerResponse.ok) {
          const triggerError = await triggerResponse.json()
          console.error('Error triggering call:', triggerError)
          // We don't fail the whole process if the call trigger fails
          // The data is already saved, we can retry the call later
          console.warn('Call trigger failed, but data was saved successfully')
        }

        // Clear localStorage after successful submission
        localStorage.removeItem('santaCall_formData')
        setStatus('success')

      } catch (err: any) {
        console.error('Error creating santa call:', err)
        setError(err.message || 'Ocurrió un error inesperado')
        setStatus('error')
      }
    }

    createSantaCall()
  }, [router, supabase])

  if (status === 'loading') {
    return (
      <main className={styles.main}>
        <div className={styles.card} style={{ maxWidth: '500px', margin: '2rem auto', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎅</div>
          <h2 style={{ color: 'var(--santa-red)', marginBottom: '1rem' }}>
            Preparando la llamada de Santa...
          </h2>
          <p style={{ color: '#666' }}>Por favor espera un momento</p>
        </div>
      </main>
    )
  }

  if (status === 'no-data') {
    return (
      <main className={styles.main}>
        <div className={styles.card} style={{ maxWidth: '500px', margin: '2rem auto', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
          <h2 style={{ color: 'var(--santa-red)', marginBottom: '1rem' }}>
            No hay datos de llamada
          </h2>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            Parece que no tienes una llamada pendiente por crear.
          </p>
          <button 
            onClick={() => router.push('/')} 
            className={styles.button}
          >
            Crear Nueva Llamada
          </button>
        </div>
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main className={styles.main}>
        <div className={styles.card} style={{ maxWidth: '500px', margin: '2rem auto', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
          <h2 style={{ color: 'var(--santa-red)', marginBottom: '1rem' }}>
            Ocurrió un error
          </h2>
          <p style={{ color: '#c33', marginBottom: '1.5rem' }}>
            {error || 'No pudimos crear tu llamada con Santa'}
          </p>
          <button 
            onClick={() => router.push('/')} 
            className={styles.button}
          >
            Intentar de nuevo
          </button>
        </div>
      </main>
    )
  }

  // Format the scheduled date for display
  const formatScheduledDate = (isoDate: string | undefined) => {
    if (!isoDate) return null
    const date = new Date(isoDate)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const scheduledDisplay = formatScheduledDate(formData?.scheduledDateTime)

  return (
    <main className={styles.main}>
      <div className={styles.card} style={{ maxWidth: '500px', margin: '2rem auto', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎄✨</div>
        <h2 style={{ color: 'var(--santa-red)', marginBottom: '1rem' }}>
          ¡Llamada Programada!
        </h2>
        <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Santa tiene todos los detalles de <strong>{formData?.childName}</strong> y 
          {scheduledDisplay ? ' recibirá' : ' pronto recibirá'} una llamada mágica al número <strong>{formData?.phoneNumber}</strong>.
        </p>

        {scheduledDisplay ? (
          <div style={{ 
            backgroundColor: '#fff8e1', 
            padding: '1rem', 
            borderRadius: '12px',
            marginBottom: '1rem',
            border: '2px solid #ffe082'
          }}>
            <p style={{ color: '#f57c00', margin: 0, fontWeight: 600 }}>
              📅 {scheduledDisplay}
            </p>
          </div>
        ) : (
          <div style={{ 
            backgroundColor: '#e3f2fd', 
            padding: '1rem', 
            borderRadius: '12px',
            marginBottom: '1rem',
            border: '2px solid #90caf9'
          }}>
            <p style={{ color: '#1565c0', margin: 0, fontWeight: 600 }}>
              📞 ¡Santa llamará en los próximos minutos!
            </p>
          </div>
        )}
        
        <div style={{ 
          backgroundColor: '#f0f9f0', 
          padding: '1rem', 
          borderRadius: '12px',
          marginBottom: '1.5rem',
          border: '2px solid #c8e6c9'
        }}>
          <p style={{ color: '#2e7d32', margin: 0 }}>
            🔔 Te enviaremos un email de confirmación con más detalles.
          </p>
        </div>

        <button 
          onClick={() => router.push('/')} 
          className={styles.button}
        >
          Volver al Inicio
        </button>
      </div>
    </main>
  )
}

