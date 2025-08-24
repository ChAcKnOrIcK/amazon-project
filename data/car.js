class Car{
  #brand;
  #model;
  #speed;
  isTrunkopen;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = 0;
    this.isTrunkopen = false;
  }

  displayInfo() {
    let trunkStatus;

    // this.isTrunkopen ? 'багажник открыт' : 'багажник закрыт';

    if (this.isTrunkopen === true) {
      trunkStatus = 'багажник открыт'
    } else {
      trunkStatus = 'багажник закрыт'
    }

    console.log(
      `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus/*this.isTrunkopen ? 'багажник открыт' : 'багажник закрыт'*/}`
    );
  }

  go() {
    if (this.isTrunkopen === true) { // можно было так (!this.isTrunkopen)
      return;
    }


    if (!(this.speed + 5 > 200)) {
      this.speed += 5;
    }

    // это код автора, тоже верный как и мой, просто есть свои плюсы 
    // this.speed += 5;

    // // Limit the speed to 200.
    // if (this.speed > 200) {
    //   this.speed = 200;
    // }
  }

  brake() {
    if (!(this.speed - 5 <= 0)) {
      this.speed -= 5;
    }
  }

  // brake() {
  //   this.speed -= 5;

  //   // Limit the speed to 0.
  //   if (this.speed < 0) {
  //     this.speed = 0;
  //   }
  // }

  onpenTrunk() {
    if (!this.speed > 0) {
      this.isTrunkopen = true;
    }
  }

  closeTrunk() {
    this.isTrunkopen = false;
  }
}

class RaceCar extends Car{ 
  acceleration;

  constructor(carDetails) {
    super(carDetails); // Это наследование constuctor класса Car
    this.acceleration = carDetails.acceleration;
  }

  go() { // так как этот метод есть в Car мы переопределяем его, прописав тоже название 
    this.speed += this.acceleration;

    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race cars do not have a trunk');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk');
  }
}



export const car1 = new Car({
  brand: 'Toyota', 
  model: 'Corolla',
});

export const car2 = new Car({
  brand: 'Tesla', 
  model: 'Model 3',
});

export const raceCar = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
});

console.log(car1);
console.log(car2);

car1.displayInfo();
car1.onpenTrunk();
car1.go();
car1.go();
car1.closeTrunk();
car1.go();
car1.go();

car1.displayInfo();
car1.brake();
car1.displayInfo();


car2.displayInfo();
car2.brake();
car2.displayInfo();

raceCar.displayInfo();

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();


// это я уже от себя добавил 
// export const cars = [];
// cars.push(car1);
// cars.push(car2);
