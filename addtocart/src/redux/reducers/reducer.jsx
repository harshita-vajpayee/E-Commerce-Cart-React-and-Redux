const INIT_STATE = {
  carts: []
};

export const cartreducer = (state = INIT_STATE, action) => {
  switch (action.type) {

    // ADD ITEM
    case "ADD_CART": {
      const ItemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (ItemIndex >= 0) {
        // increase quantity immutably
        const updatedCarts = state.carts.map((item, index) =>
          index === ItemIndex
            ? { ...item, qnty: item.qnty + 1 } // ✔ immutable
            : item
        );

        return {
          ...state,
          carts: updatedCarts
        };
      } else {
        // add new item
        const temp = { ...action.payload, qnty: 1 };
        return {
          ...state,
          carts: [...state.carts, temp]
        };
      }
    }

    // REMOVE FULL ITEM
    case "RMV_CART": {
      return {
        ...state,
        carts: state.carts.filter((el) => el.id !== action.payload)
      };
    }

    // REMOVE ONE QNTY
    case "RMV_ONE": {
      const ItemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (ItemIndex === -1) return state;

      const item = state.carts[ItemIndex];

      // If quantity > 1, decrease immutably
      if (item.qnty > 1) {
        const updatedCarts = state.carts.map((el, index) =>
          index === ItemIndex
            ? { ...el, qnty: el.qnty - 1 } // ✔ immutable update
            : el
        );

        return { ...state, carts: updatedCarts };
      }

      // If quantity = 1, remove item
      return {
        ...state,
        carts: state.carts.filter((el) => el.id !== action.payload.id)
      };
    }

    default:
      return state;
  }
};