import {
  boolean,
  date,
  index,
  integer,
  numeric,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Database schema for Hem's Institute official website.
 *
 * All program information is stored dynamically so that prices, schedules,
 * and availability can be updated without changing application source code.
 */

export const programCategories = pgTable(
  "program_categories",
  {
    id: uuid("id").primaryKey().notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    nameIdx: index("program_categories_name_idx").on(t.name),
  }),
);

export const programs = pgTable(
  "programs",
  {
    id: uuid("id").primaryKey().notNull(),
    categoryId: uuid("category_id")
      .references(() => programCategories.id, { onDelete: "restrict" })
      .notNull(),
    name: varchar("name", { length: 150 }).notNull(),
    slug: varchar("slug", { length: 150 }).notNull().unique(),
    description: text("description").notNull(),
    targetAudience: varchar("target_audience", { length: 100 }).notNull(),
    courseLevel: varchar("course_level", { length: 50 }).notNull(),
    duration: varchar("duration", { length: 100 }).notNull(),
    totalMeetings: integer("total_meetings"),
    price: numeric("price"),
    learningMethod: varchar("learning_method", { length: 100 }),
    imageUrl: text("image_url"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    categoryIdx: index("programs_category_id_idx").on(t.categoryId),
    activeIdx: index("programs_is_active_idx").on(t.isActive),
  }),
);

export const courseSchedules = pgTable(
  "course_schedules",
  {
    id: uuid("id").primaryKey().notNull(),
    programId: uuid("program_id")
      .references(() => programs.id, { onDelete: "cascade" })
      .notNull(),
    day: varchar("day", { length: 50 }).notNull(),
    startTime: time("start_time", { withTimezone: false }).notNull(),
    endTime: time("end_time", { withTimezone: false }).notNull(),
    learningMethod: varchar("learning_method", { length: 100 }).notNull(),
    capacity: integer("capacity").notNull().default(1),
    isActive: boolean("is_active").default(true).notNull(),
  },
  (t) => ({
    programIdx: index("course_schedules_program_id_idx").on(t.programId),
    activeIdx: index("course_schedules_is_active_idx").on(t.isActive),
  }),
);

export const participants = pgTable(
  "participants",
  {
    id: uuid("id").primaryKey().notNull(),
    fullName: varchar("full_name", { length: 150 }).notNull(),
    phone: varchar("phone", { length: 30 }).notNull(),
    email: varchar("email", { length: 150 }),
    birthDate: date("birth_date"),
    educationLevel: varchar("education_level", { length: 50 }).notNull(),
    schoolName: varchar("school_name", { length: 150 }),
    guardianName: varchar("guardian_name", { length: 150 }),
    guardianPhone: varchar("guardian_phone", { length: 30 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    phoneIdx: index("participants_phone_idx").on(t.phone),
  }),
);

export const registrations = pgTable(
  "registrations",
  {
    id: uuid("id").primaryKey().notNull(),
    registrationCode: varchar("registration_code", { length: 30 })
      .notNull()
      .unique(),
    participantId: uuid("participant_id")
      .references(() => participants.id, { onDelete: "cascade" })
      .notNull(),
    programId: uuid("program_id")
      .references(() => programs.id, { onDelete: "restrict" })
      .notNull(),
    scheduleId: uuid("schedule_id")
      .references(() => courseSchedules.id, { onDelete: "set null" }),
    status: varchar("status", { length: 30 }).notNull().default("new"),
    learningMethod: varchar("learning_method", { length: 100 }).notNull(),
    consentAt: timestamp("consent_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    programIdx: index("registrations_program_id_idx").on(t.programId),
    participantIdx: index("registrations_participant_id_idx").on(t.participantId),
    statusIdx: index("registrations_status_idx").on(t.status),
  }),
);

export const registrationLogs = pgTable(
  "registration_logs",
  {
    id: uuid("id").primaryKey().notNull(),
    registrationId: uuid("registration_id")
      .references(() => registrations.id, { onDelete: "cascade" })
      .notNull(),
    status: varchar("status", { length: 30 }).notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    registrationIdx: index("registration_logs_registration_id_idx").on(
      t.registrationId,
    ),
    createdAtIdx: index("registration_logs_created_at_idx").on(t.createdAt),
  }),
);

/**
 * Helper exports used by application code.
 */
export const tables = {
  programCategories,
  programs,
  courseSchedules,
  participants,
  registrations,
  registrationLogs,
} as const;
