import { mysqlTable, varchar, serial } from "drizzle-orm/mysql-core";

export const scripts = mysqlTable("scripts", {
  id: serial("id").primaryKey().notNull(),
  script: varchar("script", { length: 7 }).notNull(),
});

export type scriptProps = typeof scripts.$inferSelect;