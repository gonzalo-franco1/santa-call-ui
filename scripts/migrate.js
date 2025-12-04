const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const DB_PASSWORD = process.env.DB_PASSWORD;
const CONNECTION_STRING = `postgresql://postgres.zxpenxanwyctuxtxmveg:${encodeURIComponent(DB_PASSWORD || '')}@aws-1-eu-north-1.pooler.supabase.com:5432/postgres`;

async function migrate() {
  if (!DB_PASSWORD) {
    console.error('❌ DB_PASSWORD required. Usage: DB_PASSWORD=your-password npm run migrate');
    process.exit(1);
  }

  const sql = fs.readFileSync(path.join(__dirname, '..', 'database-schema.sql'), 'utf-8');
  const client = new Client({ connectionString: CONNECTION_STRING, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    await client.query(sql);
    console.log('✅ Migration completed');
    await client.end();
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.log('Note: If objects already exist, this is expected');
    await client.end().catch(() => {});
    process.exit(1);
  }
}

migrate();

