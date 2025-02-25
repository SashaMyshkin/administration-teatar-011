import { mysqlTable, serial, int, text } from "drizzle-orm/mysql-core";

export const biographies = mysqlTable("biographies", {
  id: serial("id").primaryKey().notNull(),
  memberId: int("memberId").notNull(),
  paragraph: text("paragraph").notNull(),
  scriptId: int("scriptId").notNull(),
  orderNumber: int("scriptId").notNull()
});

export type biographyProps = typeof biographies.$inferSelect;