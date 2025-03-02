import {
  mysqlTable,
  varchar,
  int,
  tinyint,
  serial,
  decimal,
} from "drizzle-orm/mysql-core";

export const images = mysqlTable("images", {
  id: serial("id").primaryKey(),
  serverName: varchar("serverName", { length: 256 }),
  pathName: varchar("pathName", { length: 256 }),
  fileName: varchar("fileName", { length: 256 }),
  extension: varchar("extension", { length: 10 }),
  width: int("width"),
  height: int("height"),
  size: int("size"),
  aspectRatio: decimal("aspectRatio", { precision: 2, scale: 10 }),
  visible: tinyint("visible"),
});

export type ImagesProps = typeof images.$inferSelect;

/*export const membershipStatus = mysqlTable("membershipStatus", {
  id: int("id").unsigned().notNull().primaryKey().autoincrement(),
});

// Foreign Key Constraint
members.addForeignKey("membershipStatus", ["membershipStatus"], "membershipStatus", ["id"], {
  onUpdate: "cascade",
});*/
