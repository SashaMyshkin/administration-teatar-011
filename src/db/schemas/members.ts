
import { pgTable, serial, text, varchar,smallint, date } from "drizzle-orm/pg-core";

export const members = pgTable("members", {
  id: serial('id').primaryKey(),
  name: varchar("name", { length: 20 }).notNull(),
  nameCyr: varchar("nameCyr", { length: 20 }),
  surname: varchar("surname", { length: 20 }).notNull(),
  surnameCyr: varchar("surnameCyr", { length: 20 }),
  email: varchar("email", { length: 40 }).unique(),
  dateOfBirth: date("dateOfBirth"),
  dateOfJoining: date("dateOfJoining"),
  exitDate: date("exitDate"),
  imageId: smallint("imageId"),
  identifier: varchar("identifier", { length: 30 }).unique(),
  membershipStatus: smallint("membershipStatus").notNull(),
  active: smallint("active").notNull(),
});

export type MemberProps = typeof members.$inferSelect;

