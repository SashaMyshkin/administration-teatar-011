import { mysqlTable, varchar, int, tinyint, date, serial } from "drizzle-orm/mysql-core";
//import { sql } from "drizzle-orm";

export const members = mysqlTable("members", {
  id: serial('id').primaryKey(),
  name: varchar("name", { length: 20 }).notNull(),
  nameCyr: varchar("nameCyr", { length: 20 }),
  surname: varchar("surname", { length: 20 }).notNull(),
  surnameCyr: varchar("surnameCyr", { length: 20 }),
  email: varchar("email", { length: 40 }).unique(),
  dateOfBirth: date("dateOfBirth"),
  dateOfJoining: date("dateOfJoining"),
  exitDate: date("exitDate"),
  img: varchar("img", { length: 50 }).default("/assets/img/ime-prezime/profilna.jpg"),
  imgPath: varchar("imgPath", { length: 256 }),
  alt: varchar("alt", { length: 80 }).default("Slika člana teatra"),
  identifier: varchar("identifier", { length: 30 }).unique(),
  membershipStatus: tinyint("membershipStatus").notNull(),
  active: tinyint("active").notNull(),
});

export type MemberProps = typeof members.$inferSelect;

/*export const membershipStatus = mysqlTable("membershipStatus", {
  id: int("id").unsigned().notNull().primaryKey().autoincrement(),
});

// Foreign Key Constraint
members.addForeignKey("membershipStatus", ["membershipStatus"], "membershipStatus", ["id"], {
  onUpdate: "cascade",
});*/
