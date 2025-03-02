import {
  mysqlTable,
  varchar,
  int,
  serial,
} from "drizzle-orm/mysql-core";

export const imagesAlt = mysqlTable("imagesAlt", {
  id: serial("id").primaryKey(),
  alt: varchar("alt", { length: 80 }),
  scriptId: int("scriptId"),
  imageId: int("imageId"),
});

export type ImagesProps = typeof imagesAlt.$inferSelect;
