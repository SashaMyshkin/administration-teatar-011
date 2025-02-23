import { mysqlTable, varchar, serial, int } from "drizzle-orm/mysql-core";

export const mottos = mysqlTable("mottos", {
  id: serial("id").primaryKey().notNull(),
  memberId: int("memberId").notNull(),
  motto: varchar("motto", { length: 256 }).notNull(),
  scriptId: int("scriptId").notNull()
});

export type mottoProps = typeof mottos.$inferSelect;