import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'

// все виды доставок
export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

// эта функция берет индентификатор варианта доставки и находит 
// полный вариант доставки. Сам нихрена не понял)

// сравнивает вариант доставки указанные в параметре функции со
// всеми имеющимися видами доставки. Если совпадает, то сохраняет в
// deliveryOption 

// по идее deliveryOptionId, каторые в параметре указан, это вид 
// доставки, который указан на странице.

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption; 

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

// эта функция равна либо saturday либо sunday 
function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}


// это функиця добавляет один день доставки каждый раз, пока
// remaingingDays не будет равен 0. remaingingDays это дни доставки
// того варианта доставки, который мы выбрали на странице. И с каждым 
// разом он сокращаеться, кроме выходных, а это значит, что если доставка
// поподает на выходные, то к доставке будет добавленно выходные дни.
// Так работает функция.  
// Объяснение кончено слабое, но надеюсь понять поможет.
export function calculateDeliveryDate(deliveryOption) {
  let remaingingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (remaingingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isWeekend(deliveryDate)) {
      remaingingDays--
    }
  }
  
  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );
  return dateString;
};