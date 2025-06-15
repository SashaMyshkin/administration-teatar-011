import { relations } from "drizzle-orm/relations";
import { members_uid, members, scripts, performances_uid, performances, members_biographies, awards_uid, awards, festivals_uid, festivals, festivals_year, images, images_alt, images_entity_types, images_relations, performances_types_uid, metadata_uid, metadata, performances_about, performances_roles_uid, performances_roles, performances_types, members_membership_status_uid, awards_festivals_members, metadata_entity_types, performances_roles_members } from "./schema";

export const membersRelations = relations(members, ({one}) => ({
	members_uid: one(members_uid, {
		fields: [members.member_uid],
		references: [members_uid.id]
	}),
	script: one(scripts, {
		fields: [members.script_id],
		references: [scripts.id]
	}),
}));

export const members_uidRelations = relations(members_uid, ({one, many}) => ({
	members: many(members),
	members_biographies: many(members_biographies),
	members_membership_status_uid: one(members_membership_status_uid, {
		fields: [members_uid.membership_status_uid],
		references: [members_membership_status_uid.id]
	}),
	awards_festivals_members: many(awards_festivals_members),
	performances_roles_members: many(performances_roles_members),
}));

export const scriptsRelations = relations(scripts, ({many}) => ({
	members: many(members),
	performances: many(performances),
	members_biographies: many(members_biographies),
	awards: many(awards),
	festivals: many(festivals),
	images_alts: many(images_alt),
	metadata: many(metadata),
	performances_abouts: many(performances_about),
	performances_roles: many(performances_roles),
	performances_types: many(performances_types),
}));

export const performancesRelations = relations(performances, ({one}) => ({
	performances_uid: one(performances_uid, {
		fields: [performances.performance_uid],
		references: [performances_uid.id]
	}),
	script: one(scripts, {
		fields: [performances.script_id],
		references: [scripts.id]
	}),
}));

export const performances_uidRelations = relations(performances_uid, ({one, many}) => ({
	performances: many(performances),
	festivals_years: many(festivals_year),
	performances_types_uid: one(performances_types_uid, {
		fields: [performances_uid.performance_type_uid],
		references: [performances_types_uid.id]
	}),
	performances_abouts: many(performances_about),
	performances_roles_uids: many(performances_roles_uid),
}));

export const members_biographiesRelations = relations(members_biographies, ({one}) => ({
	members_uid: one(members_uid, {
		fields: [members_biographies.member_uid],
		references: [members_uid.id]
	}),
	script: one(scripts, {
		fields: [members_biographies.script_id],
		references: [scripts.id]
	}),
}));

export const awardsRelations = relations(awards, ({one}) => ({
	awards_uid: one(awards_uid, {
		fields: [awards.award_uid],
		references: [awards_uid.id]
	}),
	script: one(scripts, {
		fields: [awards.script_id],
		references: [scripts.id]
	}),
}));

export const awards_uidRelations = relations(awards_uid, ({many}) => ({
	awards: many(awards),
	awards_festivals_members: many(awards_festivals_members),
}));

export const festivalsRelations = relations(festivals, ({one}) => ({
	festivals_uid: one(festivals_uid, {
		fields: [festivals.festival_uid],
		references: [festivals_uid.id]
	}),
	script: one(scripts, {
		fields: [festivals.script_id],
		references: [scripts.id]
	}),
}));

export const festivals_uidRelations = relations(festivals_uid, ({many}) => ({
	festivals: many(festivals),
	festivals_years: many(festivals_year),
}));

export const festivals_yearRelations = relations(festivals_year, ({one, many}) => ({
	festivals_uid: one(festivals_uid, {
		fields: [festivals_year.festival_uid],
		references: [festivals_uid.id]
	}),
	performances_uid: one(performances_uid, {
		fields: [festivals_year.performance_uid],
		references: [performances_uid.id]
	}),
	awards_festivals_members: many(awards_festivals_members),
}));

export const images_altRelations = relations(images_alt, ({one}) => ({
	image: one(images, {
		fields: [images_alt.image_id],
		references: [images.id]
	}),
	script: one(scripts, {
		fields: [images_alt.script_id],
		references: [scripts.id]
	}),
}));

export const imagesRelations = relations(images, ({many}) => ({
	images_alts: many(images_alt),
	images_relations: many(images_relations),
}));

export const images_relationsRelations = relations(images_relations, ({one}) => ({
	images_entity_type: one(images_entity_types, {
		fields: [images_relations.entity_type_id],
		references: [images_entity_types.id]
	}),
	image: one(images, {
		fields: [images_relations.image_id],
		references: [images.id]
	}),
}));

export const images_entity_typesRelations = relations(images_entity_types, ({many}) => ({
	images_relations: many(images_relations),
}));

export const performances_types_uidRelations = relations(performances_types_uid, ({many}) => ({
	performances_uids: many(performances_uid),
	performances_types: many(performances_types),
}));

export const metadataRelations = relations(metadata, ({one}) => ({
	metadata_uid: one(metadata_uid, {
		fields: [metadata.metadata_uid],
		references: [metadata_uid.id]
	}),
	script: one(scripts, {
		fields: [metadata.script_id],
		references: [scripts.id]
	}),
}));

export const metadata_uidRelations = relations(metadata_uid, ({one, many}) => ({
	metadata: many(metadata),
	metadata_entity_type: one(metadata_entity_types, {
		fields: [metadata_uid.entity_type_id],
		references: [metadata_entity_types.id]
	}),
}));

export const performances_aboutRelations = relations(performances_about, ({one}) => ({
	performances_uid: one(performances_uid, {
		fields: [performances_about.performance_uid],
		references: [performances_uid.id]
	}),
	script: one(scripts, {
		fields: [performances_about.script_id],
		references: [scripts.id]
	}),
}));

export const performances_rolesRelations = relations(performances_roles, ({one}) => ({
	performances_roles_uid: one(performances_roles_uid, {
		fields: [performances_roles.performance_role_uid],
		references: [performances_roles_uid.id]
	}),
	script: one(scripts, {
		fields: [performances_roles.script_id],
		references: [scripts.id]
	}),
}));

export const performances_roles_uidRelations = relations(performances_roles_uid, ({one, many}) => ({
	performances_roles: many(performances_roles),
	performances_uid: one(performances_uid, {
		fields: [performances_roles_uid.performance_uid],
		references: [performances_uid.id]
	}),
	performances_roles_members: many(performances_roles_members),
}));

export const performances_typesRelations = relations(performances_types, ({one}) => ({
	performances_types_uid: one(performances_types_uid, {
		fields: [performances_types.performance_type_uid],
		references: [performances_types_uid.id]
	}),
	script: one(scripts, {
		fields: [performances_types.script_id],
		references: [scripts.id]
	}),
}));

export const members_membership_status_uidRelations = relations(members_membership_status_uid, ({many}) => ({
	members_uids: many(members_uid),
}));

export const awards_festivals_membersRelations = relations(awards_festivals_members, ({one}) => ({
	awards_uid: one(awards_uid, {
		fields: [awards_festivals_members.award_uid],
		references: [awards_uid.id]
	}),
	festivals_year: one(festivals_year, {
		fields: [awards_festivals_members.festival_year_id],
		references: [festivals_year.id]
	}),
	members_uid: one(members_uid, {
		fields: [awards_festivals_members.member_uid],
		references: [members_uid.id]
	}),
}));

export const metadata_entity_typesRelations = relations(metadata_entity_types, ({many}) => ({
	metadata_uids: many(metadata_uid),
}));

export const performances_roles_membersRelations = relations(performances_roles_members, ({one}) => ({
	members_uid: one(members_uid, {
		fields: [performances_roles_members.member_uid],
		references: [members_uid.id]
	}),
	performances_roles_uid: one(performances_roles_uid, {
		fields: [performances_roles_members.performance_role_uid],
		references: [performances_roles_uid.id]
	}),
}));