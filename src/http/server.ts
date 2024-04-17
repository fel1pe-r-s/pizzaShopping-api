import Elysia from "elysia";
import { registerRestaurant } from "./routes/register-restaurant";
import { sendAuthLink } from "./routes/send-auth-link";
import { authenticateFromLink } from "./routes/authenticate-from-link";
import { signOut } from "./routes/sign-out";
import { getProfile } from "./routes/get-profile";
import { getManagedRestaurant } from "./routes/get-managed-restaurant";
import { getOrderDetails } from "./routes/get-order-details";
import { approveOrder } from "./routes/approve-order";
import { cancelOrder } from "./routes/cancel-order";
import { dispatchOrder } from "./routes/dispatch-order";
import { deliverOrder } from "./routes/deliver-order";
import { getOrders } from "./routes/get-orders";
import { getMonthReceipt } from "./routes/get-month-receipt";
import { getDayOrdersAmount } from "./routes/get-day-orders-amount";
import { getMonthOrdersAmount } from "./routes/get-month-orders-amount";
import { getMonthCanceledOrdersAmount } from "./routes/get-month-canceled-orders-amount";

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurant)
  .use(getOrderDetails)
  .use(approveOrder)
  .use(cancelOrder)
  .use(dispatchOrder)
  .use(deliverOrder)
  .use(getOrders)
  .use(getMonthReceipt)
  .use(getDayOrdersAmount)
  .use(getMonthOrdersAmount)
  .use(getMonthCanceledOrdersAmount)
  .onError(({ error, code, set }) => {
    switch (code) {
      case "VALIDATION": {
        set.status = error.status;

        return error.toResponse();
      }
      case "NOT_FOUND": {
        return new Response(null, { status: 404 });
      }
      default: {
        console.error(error);
        return new Response(null, { status: 500 });
      }
    }
  });

app.listen(3000, () => {
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
});
