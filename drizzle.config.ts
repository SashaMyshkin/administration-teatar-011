import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgres://postgres.rscztbtvdxlukflnjbmh:wc8VnWZf4DlASvI0@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?sslmode=require",
  },
  introspect:{
    casing: 'preserve'
  }
  
});
