# Supabase Setup

## Database Migration

Run the migration:
```bash
DB_PASSWORD=SantaCallDBPass npm run migrate
```

Or manually: Copy `database-schema.sql` to Supabase SQL Editor and run it.

## Usage

**Server Components:**
```typescript
import { getCurrentUser } from '@/lib/auth'
import { createSantaCall } from '@/lib/db'

const user = await getCurrentUser()
await createSantaCall({ user_id: user.id, child_name: '...', ... })
```

**Client Components:**
```typescript
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()
await supabase.auth.signOut()
```

