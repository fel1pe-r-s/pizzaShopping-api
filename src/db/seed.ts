import { faker } from "@faker-js/faker";
import { restaurants, users } from "./schema";
import { db } from "./connection";

// eslint-disable-next-line drizzle/enforce-delete-with-where
await db.delete(users);
// eslint-disable-next-line drizzle/enforce-delete-with-where
await db.delete(restaurants);

await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: "customer",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: "customer",
  },
]);

const [manager] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: "admin@admin.com",
      role: "manager",
    },
  ])
  .returning({
    id: users.id,
  });

await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    manegeId: manager.id,
  },
]);

console.log("Database seeded successfully!");

process.exit(0);
