import Elysia from "elysia";
import { auth } from "../auth";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { db } from "../../db/connection";
import { orders } from "../../db/schema";
import { eq } from "drizzle-orm";

export const dispatchOrder = new Elysia()
  .use(auth)
  .patch(
    "/orders/:orderId/dispatch",
    async ({ params, getCurrentUser, set }) => {
      const { orderId } = params;
      const { restaurantId } = await getCurrentUser();

      if (!restaurantId) {
        throw new UnauthorizedError();
      }

      const order = await db.query.orders.findFirst({
        where(fields, { eq }) {
          return eq(fields.id, orderId);
        },
      });

      if (!order) {
        set.status = 400;

        return { message: "Order not found" };
      }

      if (order.status !== "processing") {
        set.status = 400;

        return {
          message:
            "You cannot deliver orders tha are not in 'delivering' status.",
        };
      }

      await db
        .update(orders)
        .set({ status: "delivering" })
        .where(eq(orders.id, orderId));
    }
  );