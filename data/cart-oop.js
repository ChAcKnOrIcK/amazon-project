// пришлось поменять немного код, так как у автора нет некоторого кода, который я добавил выполняя домашнии задания. 

function Cart(localStorageKey) {
  const cart = {
    // ниже в коде будет заменена cart на this. Если мы изменим название cart, то мы все равно будет обращаться к этому массиву
    // обращаться к переменной с помощью this можно только, если
    // мы хотим обратиться к переменной из самого объекта, который 
    // находиться внутри этой же переменой. Снаружи этой переменной не нужно обращаться как this, а просто по названию, на данный момент это cart.
    cartItems: undefined,

    loadFromStorage() { // по названию очевидно что делает функция 
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    }, 

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    }, 

    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((cartItem)=> {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      // const quantitySelector = document.querySelector(
      //   `.js-quantity-selector-${productId}`
      // );

      // const quantity = Number(quantitySelector.value)

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1, 
          deliveryOptionId: '1'
        });
      }
      this.saveToStorage();
    },

    removeFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;

      this.saveToStorage();
    },

    updateQuantity(productId, newQuantity) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.quantity = newQuantity;
      
      this.saveToStorage();
    },
  };

  return cart;
};

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.cartItems.forEach((CartItem) => {
    cartQuantity += CartItem.quantity;
  });
  
  return cartQuantity;
};


export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.cartItems.forEach((cartItem)=> {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}