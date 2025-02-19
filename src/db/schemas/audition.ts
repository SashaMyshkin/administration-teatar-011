import { mysqlTable, int, serial, varchar, datetime, time, tinyint, date } from "drizzle-orm/mysql-core"

const audition = mysqlTable('audition', {
  id: serial('id').primaryKey(),
  auditionTypeId: int('auditionTypeId').notNull(),
  presentationTypeId: int('presentationTypeId').notNull(),
  startDate: date('startDate').notNull(),
  endDate: date('endDate'),
  deadLine: date('deadLine'),
  auditionTime: time('auditionTime').notNull(),
  enrollmentDateTime: datetime('enrollmentDateTime'),
  membershipFee: int('membershipFee'),
  uniqueKey: varchar('uniqueKey', { length: 12 }).notNull(),
  isOpen: tinyint('isOpen').notNull().default(0),
  finished: int('finished'),
});

export default audition;
