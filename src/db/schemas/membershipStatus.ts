import { mysqlTable, varchar, serial } from "drizzle-orm/mysql-core";

export const membershipStatus = mysqlTable("membershipStatus", {
  id: serial("id").primaryKey(),
  status: varchar("status", { length: 20 }).notNull(),
});
