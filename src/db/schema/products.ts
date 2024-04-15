import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { restaurants, orderItems } from ".";
import { relations } from "drizzle-orm";

export const products = pgTable("products", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),

  name: text("name").notNull(),
  description: text("description"),
  priceInCents: text("price_in_cents").notNull(),
  restaurantId: text("restaurant_id")
    .notNull()
    .references(() => restaurants.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAte: timestamp("updated_at").notNull().defaultNow(),
});

export const productsRelations = relations(products, ({ one, many }) => {
  return {
    restaurant: one(restaurants, {
      fields: [products.restaurantId],
      references: [restaurants.id],
      relationName: "product_restaurant",
    }),
    orderItems: many(orderItems),
  };
});
