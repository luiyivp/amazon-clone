export const state = () => ({
  cart: [],
  cartLength: 0,
  shippingPrice: 0,
  shippingEstimatedDelivery: ''
});

export const mutations = {
  pushProductToCart(state, product) {
    product.quantity = 1;
    state.cart.push(product);
  },
  incrementProductQty(state, product) {
    product.quantity++;
    let indexOfProduct = state.cart.indexOf(product);
    state.cart.splice(indexOfProduct, 1, product);
  },
  incrementCartLength(state) {
    state.cartLength = 0;
    if (state.cart.length > 0) {
      state.cart.map(product => {
        state.cartLength += product.quantity;
      });
    }
  },
  // 1. Find the product in the cart
  // 2. Change the quantity of the product
  // 3. Update the length of the cart
  // 4. Replace the old product with the updated
  changeQty(state, { product, qty }) {
    let cartProduct = state.cart.find(prod => prod._id === product._id);
    cartProduct.quantity = qty;

    state.cartLength = 0;
    if (state.cart.length > 0) {
      state.cart.map(product => {
        state.cartLength += product.quantity;
      });
    }

    let indexOfProduct = state.cart.indexOf(cartProduct);
    state.cart.splice(indexOfProduct, 1, cartProduct);
  },
  // 1. Remove the product quantity from the cartLenght
  // 2. Get the index of the product that we want to delete
  // 3. Remove that prodcut by using splice
  removeProduct(state, product) {
    state.cartLength -= product.quantity;
    let indexOfProduct = state.cart.indexOf(product);
    state.cart.splice(indexOfProduct, 1);
  },
  setShipping(state, { price, estimatedDelivery }) {
    state.shippingPrice = price;
    state.shippingEstimatedDelivery = estimatedDelivery;
  },
  clearCart(state) {
    state.cart = [];
    state.cartLength = 0;
    state.shippingPrice = 0;
    state.shippingEstimatedDelivery = '';
  }
};

export const actions = {
  addProductToCart({ state, commit }, product) {
    const cartProduct = state.cart.find(prod => prod._id === product._id);

    if (!cartProduct) {
      commit('pushProductToCart', product);
    } else {
      commit('incrementProductQty', cartProduct);
    }

    commit('incrementCartLength');
  }
};

export const getters = {
  getCartLength(state) {
    return state.cartLength;
  },
  getCart(state) {
    return state.cart;
  },
  getCartTotalPrice(state) {
    let total = 0;
    state.cart.map(product => {
      total += product.price * product.quantity;
    });

    return total;
  },
  getCartTotalPriceWithShipping(state) {
    let total = 0;
    state.cart.map(product => {
      total += product.price * product.quantity;
    });

    return total + state.shippingPrice;
  },
  getEstimatedDelivery(state) {
    return state.shippingEstimatedDelivery;
  }
};
