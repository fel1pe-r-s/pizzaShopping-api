CREATE TABLE IF NOT EXISTS "order_items" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"product_id" text NOT NULL,
	"price_in_cents" integer NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "customer_id" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "restaurant_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "status" "order_status" DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "total_in_cents" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "order_id";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "product_id";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "price_in_cents";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "quantity";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE set default ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
