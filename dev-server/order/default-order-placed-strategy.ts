import { RequestContext } from "@vendure/core/dist/api/common/request-context";
import { Order } from "@vendure/core/dist/entity/order/order.entity";
import { OrderState } from "@vendure/core/dist/service/helpers/order-state-machine/order-state";
import { OrderPlacedStrategy } from "./order-placed-strategy";

/**
 * @description
 * The default {@link OrderPlacedStrategy}. The order is set as "placed" when it transitions from
 * 'ArrangingPayment' to either 'PaymentAuthorized' or 'PaymentSettled'.
 *
 * @docsCategory orders
 */
export class DefaultOrderPlacedStrategy implements OrderPlacedStrategy {
  shouldSetAsPlaced(
    ctx: RequestContext,
    fromState: OrderState,
    toState: OrderState,
    order: Order
  ): boolean {
    return fromState === "AddingItems" && toState === "ArrangingPayment"
      ? true
      : false;
  }
}
