import type { Config } from "drizzle-kit";
export default {
  schema: "./src/schema/*",
  out: "./drizzle",
  driver: "pg",
} satisfies Config;
