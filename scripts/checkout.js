import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';
// import '../data/cart-class.js';
// import {car1, car2, /*cars*/} from '../data/car.js';
// import '../data/backend-practice.js';


// пояснение. У нас есть promise, у него несклько состояний. pending, fulfilled, rejected. 1 это ожидает(пока еще не закончил работу), 2 успешно завершен, 3 завершен с ошибкой. Так вот, для Promise мы передаем параметр resolve, чтобы сделать Promise не fulfilled, типо все готово, а pending типо еще в процессе код ниже. И далее мы сделаем его pending только после загрузки товаров, сделаем мы это вызвав resolve. Важно. мы прописываем loadProducts и в него, в качестве параметра запихиваем безымянную функцию, которая запустится только после loadProducts, так как она находиться в ее параметре. То есть она запуститься только после загрузки товаров. И в этой безымяной функции находиться наш resolve(), который делает Promise снова fulfilled, типа готово. 
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

// loadProducts(() => {
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// })

async function loadPage() {
  try{
    // throw 'error1'; этот код создает вручную ошибку 

    await loadProductsFetch()

    const value = await new Promise((resolve, reject) => {
      // throw 'error2';
      loadCart(() => {
        //reject('error3');
        resolve('value3'); 
      });
    });

  } catch (error) {
    console.log('Unexpected error. Please try again later.')
  }
  

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

  return 'value2';
}

loadPage()

// код выше короче кода ниже, хотя делают они одно и тоже

/*
function loadPage() {
  return new Promise(() => {
    console.log('load page');
    resolve();

  }).then(() => {
    return loadProductsFetch();

  }).then(() => {
    return new Promise((resolve) => {
      resolve('value2')
    });
  });
}
*/




// Promise.all([
//   loadProductsFetch()
//   // ниже код можно удалить, оставил просто чтобы сравнить с функцией выше. Они выполняют одно и тоже 
//   // new Promise((resolve) => {
//   //   loadProducts(() => {
//   //     resolve('value1'); // первый 
//   //   });
//   // })
//   , 
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();  // второй 
//     });
//   })

// ]).then((values) => {
//   console.log(values);  // тут два параметра выводяться, которые есть выше 
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });


// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value1'); // все что внутри скобок сохраняеться ниже
//   });

// }).then((value) => {  // вот здесь сохраняеться 
//   console.log(value);

//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   });

// }).then(() => {
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// loadProducts(() => {
//   loadCart(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
//   })
// });


