import { mysqlTable, serial, varchar, datetime, tinyint, char } from "drizzle-orm/mysql-core"

const users = mysqlTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 20 }).notNull(),
    surname: varchar('surname', { length: 20 }).notNull(),
    email: varchar('email', { length: 50 }),
    telephone: varchar('telephone', { length: 17 }),
    username: varchar('username', { length: 30 }).notNull().unique(),
    password: char('password', { length: 64 }),
    roles: varchar('roles', { length: 17 }).notNull().default('user,member'),
    lastLogin: datetime('lastLogin'),
    active: tinyint('active').notNull().default(0),
  });

  export default users;