import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { users, orders, products } from ".";

export const restaurants = pgTable("restaurants", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  manegeId: text("manager_id").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const restaurantsRelation = relations(restaurants, ({ one, many }) => {
  return {
    manager: one(users, {
      fields: [restaurants.manegeId],
      references: [users.id],
      relationName: "restaurants_manager",
    }),
    orders: many(orders),
    products: many(products),
  };
});
