import { pgTable, pgPolicy, integer, text, foreignKey, date, unique, smallint, pgView } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const members_membership_status = pgTable("members_membership_status", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "members_membership_status_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	membership_status_uid: integer().notNull(),
	script_id: integer().notNull(),
	status_name: text().notNull(),
}, (table) => [
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const scripts = pgTable("scripts", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "scripts_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: text().notNull(),
	status: integer().notNull(),
}, (table) => [
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const members = pgTable("members", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "members_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	member_uid: integer().notNull(),
	script_id: integer().notNull(),
	name: text().notNull(),
	surname: text().notNull(),
	motto: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.member_uid],
			foreignColumns: [members_uid.id],
			name: "members_member_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.script_id],
			foreignColumns: [scripts.id],
			name: "members_script_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const performances = pgTable("performances", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "performances_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	performance_uid: integer().notNull(),
	script_id: integer().notNull(),
	title: text().notNull(),
	slogan: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.performance_uid],
			foreignColumns: [performances_uid.id],
			name: "performances_performance_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.script_id],
			foreignColumns: [scripts.id],
			name: "performances_script_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const members_biographies = pgTable("members_biographies", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "members_biographies_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	member_uid: integer().notNull(),
	script_id: integer().notNull(),
	paragraph: text().notNull(),
	order_number: integer(),
}, (table) => [
	foreignKey({
			columns: [table.member_uid],
			foreignColumns: [members_uid.id],
			name: "members_biographies_member_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.script_id],
			foreignColumns: [scripts.id],
			name: "members_biographies_script_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const awards = pgTable("awards", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "awards_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	award_uid: integer().notNull(),
	script_id: integer().notNull(),
	name: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.award_uid],
			foreignColumns: [awards_uid.id],
			name: "awards_award_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.script_id],
			foreignColumns: [scripts.id],
			name: "awards_script_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"], withCheck: sql`(auth.role() = 'admin'::text)`  }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"] }),
]);

export const festivals = pgTable("festivals", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "festivals_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	festival_uid: integer().notNull(),
	script_id: integer().notNull(),
	name: text().notNull(),
	place: text(),
}, (table) => [
	foreignKey({
			columns: [table.festival_uid],
			foreignColumns: [festivals_uid.id],
			name: "festivals_festival_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.script_id],
			foreignColumns: [scripts.id],
			name: "festivals_script_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"], withCheck: sql`(auth.role() = 'admin'::text)`  }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
	pgPolicy("All- select", { as: "permissive", for: "select", to: ["public"] }),
]);

export const festivals_year = pgTable("festivals_year", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "festivals_year_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	festival_uid: integer().notNull(),
	performance_uid: integer().notNull(),
	year: integer().notNull(),
	start_date: date(),
	end_date: date(),
}, (table) => [
	foreignKey({
			columns: [table.festival_uid],
			foreignColumns: [festivals_uid.id],
			name: "festivals_year_festival_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.performance_uid],
			foreignColumns: [performances_uid.id],
			name: "festivals_year_performance_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"], withCheck: sql`(auth.role() = 'admin'::text)`  }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"] }),
]);

export const images = pgTable("images", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "images_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	path: text().notNull(),
	extension: text(),
	width: integer().notNull(),
	height: integer().notNull(),
	visible: smallint().notNull(),
}, (table) => [
	unique("images_path_key").on(table.path),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const images_alt = pgTable("images_alt", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "images_alt_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	image_id: integer().notNull(),
	script_id: integer().notNull(),
	alt: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.image_id],
			foreignColumns: [images.id],
			name: "images_alt_image_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.script_id],
			foreignColumns: [scripts.id],
			name: "images_alt_script_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const images_entity_types = pgTable("images_entity_types", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "images_entity_types_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	type: text().notNull(),
	description: text().notNull(),
}, (table) => [
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const images_relations = pgTable("images_relations", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "images_relations_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	image_id: integer().notNull(),
	entity_type_id: integer().notNull(),
	entity_id: integer().notNull(),
	order: integer().default(0),
}, (table) => [
	foreignKey({
			columns: [table.entity_type_id],
			foreignColumns: [images_entity_types.id],
			name: "images_relations_entity_type_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.image_id],
			foreignColumns: [images.id],
			name: "images_relations_image_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const performances_uid = pgTable("performances_uid", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "performances_uid_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	performance_type_uid: integer().notNull(),
	identifier: text().notNull(),
	date_of_premiere: date().notNull(),
	public: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.performance_type_uid],
			foreignColumns: [performances_types_uid.id],
			name: "performances_uid_performance_type_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	unique("performances_uid_identifier_key").on(table.identifier),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const performances_types_uid = pgTable("performances_types_uid", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "performances_types_uid_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
}, (table) => [
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const metadata = pgTable("metadata", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "metadata_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	metadata_uid: integer().notNull(),
	script_id: integer().notNull(),
	title: text().notNull(),
	description: text().notNull(),
	keywords: text().notNull(),
	og_title: text().notNull(),
	og_description: text().notNull(),
	og_image_alt: text(),
}, (table) => [
	foreignKey({
			columns: [table.metadata_uid],
			foreignColumns: [metadata_uid.id],
			name: "metadata_metadata_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.script_id],
			foreignColumns: [scripts.id],
			name: "metadata_script_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const performances_about = pgTable("performances_about", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "performances_about_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	performance_uid: integer().notNull(),
	script_id: integer().notNull(),
	paragraph: text().notNull(),
	order_number: integer(),
}, (table) => [
	foreignKey({
			columns: [table.performance_uid],
			foreignColumns: [performances_uid.id],
			name: "performances_about_performance_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.script_id],
			foreignColumns: [scripts.id],
			name: "performances_about_script_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const performances_roles = pgTable("performances_roles", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "performances_roles_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	performance_role_uid: integer().notNull(),
	script_id: integer().notNull(),
	role_name: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.performance_role_uid],
			foreignColumns: [performances_roles_uid.id],
			name: "performances_roles_performance_role_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.script_id],
			foreignColumns: [scripts.id],
			name: "performances_roles_script_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const performances_roles_uid = pgTable("performances_roles_uid", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "performances_roles_uid_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	performance_uid: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.performance_uid],
			foreignColumns: [performances_uid.id],
			name: "performances_roles_uid_performance_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const performances_types = pgTable("performances_types", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "performances_types_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	performance_type_uid: integer().notNull(),
	script_id: integer().notNull(),
	type_name: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.performance_type_uid],
			foreignColumns: [performances_types_uid.id],
			name: "performances_types_performance_type_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.script_id],
			foreignColumns: [scripts.id],
			name: "performances_types_script_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const members_uid = pgTable("members_uid", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "members_uid_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	membership_status_uid: integer().notNull(),
	identifier: text().notNull(),
	email: text(),
	date_of_birth: date(),
	date_of_joining: date().notNull(),
	date_of_leaving: date(),
	public: integer().default(0),
}, (table) => [
	foreignKey({
			columns: [table.membership_status_uid],
			foreignColumns: [members_membership_status_uid.id],
			name: "members_uid_membership_status_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	unique("members_uid_identifier_key").on(table.identifier),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const members_membership_status_uid = pgTable("members_membership_status_uid", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "members_membership_status_uid_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	code: text(),
	description: text().notNull(),
}, (table) => [
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const awards_festivals_members = pgTable("awards_festivals_members", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "awards_festivals_members_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	award_uid: integer().notNull(),
	festival_year_id: integer().notNull(),
	member_uid: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.award_uid],
			foreignColumns: [awards_uid.id],
			name: "awards_festivals_members_award_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.festival_year_id],
			foreignColumns: [festivals_year.id],
			name: "awards_festivals_members_festival_year_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.member_uid],
			foreignColumns: [members_uid.id],
			name: "awards_festivals_members_member_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"], withCheck: sql`(auth.role() = 'admin'::text)`  }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"] }),
]);

export const awards_uid = pgTable("awards_uid", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "awards_uid_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	importance: integer(),
}, (table) => [
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const festivals_uid = pgTable("festivals_uid", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "festivals_uid_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	importance: integer(),
}, (table) => [
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"], withCheck: sql`(auth.role() = 'admin'::text)`  }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"] }),
]);

export const metadata_entity_types = pgTable("metadata_entity_types", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "metadata_entity_types_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	type: text().notNull(),
	description: text().notNull(),
}, (table) => [
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const metadata_uid = pgTable("metadata_uid", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "metadata_uid_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	entity_type_id: integer().notNull(),
	entity_id: integer().notNull(),
	og_type: text().notNull(),
	og_url: text().notNull(),
	og_image: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.entity_type_id],
			foreignColumns: [metadata_entity_types.id],
			name: "metadata_uid_entity_type_id_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const performances_roles_members = pgTable("performances_roles_members", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "performances_roles_members_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	performance_role_uid: integer().notNull(),
	member_uid: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.member_uid],
			foreignColumns: [members_uid.id],
			name: "performances_roles_members_member_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.performance_role_uid],
			foreignColumns: [performances_roles_uid.id],
			name: "performances_roles_members_performance_role_uid_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	pgPolicy("All - select", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Authenticated admins - insert", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - update", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Authenticated admins - delete", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);
export const v_membership_statuses = pgView("v_membership_statuses", {	uid: integer(),
	code: text(),
	status: text(),
	script: text(),
	script_id: integer(),
}).with({"securityInvoker":true}).as(sql`SELECT uid.id AS uid, uid.code, ms.status_name AS status, s.name AS script, s.id AS script_id FROM members_membership_status_uid uid JOIN members_membership_status ms ON uid.id = ms.membership_status_uid JOIN scripts s ON s.id = ms.script_id`);