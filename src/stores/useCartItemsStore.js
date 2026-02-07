import { assoc, dissoc, evolve } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartItemsStore = create(
  persist(
    set => ({
      cartItems: {},
      setSelectedQuantity: (slug, quantity) => {
        set(({ cartItems }) => {
          if (quantity <= 0) {
            return { cartItems: dissoc(slug, cartItems) };
          }

          return { cartItems: assoc(slug, quantity, cartItems) };
        });
      },
      clearCart: () => set({ cartItems: {} }),
      removeCartItem: slug => set(evolve({ cartItems: dissoc(slug) })),
    }),
    { name: "cart-item-store" }
  )
);

export default useCartItemsStore;
