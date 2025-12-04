# Santa Call UI

Web app para configurar llamadas de Santa Claus para niños.

## Setup Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env.local
   ```
   Editar `.env.local` con tus valores de Supabase:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
   ```

3. **Ejecutar migración de base de datos:**
   ```bash
   DB_PASSWORD=SantaCallDBPass npm run migrate
   ```

4. **Iniciar desarrollo:**
   ```bash
   npm run dev
   ```

## Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima/pública de Supabase | ✅ |

### Dónde encontrar las credenciales de Supabase

1. Ir a [Supabase Dashboard](https://app.supabase.com)
2. Seleccionar tu proyecto
3. Navegar a **Settings** → **API**
4. Copiar:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Deploy en Vercel

### Paso 1: Importar proyecto

1. Ir a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Importar tu repositorio de Git
4. Vercel detectará automáticamente que es Next.js

### Paso 2: Configurar variables de entorno (⚠️ IMPORTANTE)

En la pantalla de configuración de Vercel, **ANTES de hacer deploy**:

1. Expandir la sección **"Environment Variables"**
2. Agregar las siguientes variables:

   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://tu-proyecto.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIs...` |

3. Asegurarse de que estén habilitadas para: ✅ Production, ✅ Preview, ✅ Development

### Paso 3: Deploy

Click **"Deploy"** y esperar a que termine.

### Paso 4: Configurar Supabase para producción

Después del deploy, actualizar Supabase para permitir tu nuevo dominio:

1. Ir a [Supabase Dashboard](https://app.supabase.com) → Tu proyecto
2. Navegar a **Authentication** → **URL Configuration**
3. Actualizar **Site URL** a tu dominio de Vercel (ej: `https://santa-call-ui.vercel.app`)
4. Agregar a **Redirect URLs**:
   - `https://tu-dominio.vercel.app/auth/callback`

### Si ya hiciste deploy sin las variables

1. Ir a tu proyecto en Vercel Dashboard
2. **Settings** → **Environment Variables**
3. Agregar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Ir a **Deployments** → click en los 3 puntos del último deploy → **"Redeploy"**

Ver `VERCEL_DEPLOY.md` para instrucciones más detalladas.

## Estructura

- `src/lib/supabase/` - Clientes de Supabase (cliente/servidor)
- `src/lib/auth.ts` - Helpers de autenticación
- `src/lib/db.ts` - Operaciones de base de datos
- `src/app/login/` - Página de login (con Google OAuth)
- `src/app/signup/` - Página de registro (con Google OAuth)
- `database-schema.sql` - Schema de la base de datos

## Google OAuth

Para habilitar login con Google:
1. Crear credenciales OAuth en Google Cloud Console
2. Configurar en Supabase Dashboard → Authentication → Providers → Google
3. Ver `GOOGLE_OAUTH_SETUP.md` para detalles
