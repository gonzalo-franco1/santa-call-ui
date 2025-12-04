# Santa Call UI

Web app para configurar llamadas de Santa Claus para niños.

## Setup

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Crear `.env.local` con:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://zxpenxanwyctuxtxmveg.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Ejecutar migración de base de datos:**
   ```bash
   DB_PASSWORD=SantaCallDBPass npm run migrate
   ```

4. **Iniciar desarrollo:**
   ```bash
   npm run dev
   ```

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
