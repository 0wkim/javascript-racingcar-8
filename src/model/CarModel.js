import { Console, Random } from "@woowacourse/mission-utils";

// 자동차 이름 분리
function namingCar (inputCarName) {
    const cars = inputCarName.split(',');
    return cars.map((car) => car.trim());
}

// 랜덤 숫자 추출 후, 라운드 별 각 숫자 저장
function pickNumber(cars) {
    const roundResultNumber = [];
    for (let i=0; i < cars.length; i++) { // 이걸 car로 하지말고 시도횟수로 해서 자동차 하나씩 관리
        roundResultNumber.push(Random.pickNumberInRange(0, 9));
    }

    return roundResultNumber; // [0, 4, 5, 7]
}

// 숫자로 전진, 멈춤 구분 
function movingCar(roundResultNumber) {
    const roundResult = [];

    roundResultNumber.forEach((number) => {
        if (number >= 4) roundResult.push("-");
        if (number < 4) roundResult.push("0");
    });

    Console.print(roundResult);
    return roundResult; 
}

// 자동차 수 별 결과 도출, 객체로 관리
function carsRacing(cars, roundResult, carsObject) {
    // const addRoundResult = [];
    for (let i = 0; i < cars.length; i++) {
        if(!carsObject[cars[i]]) carsObject[cars[i]] = [];

        carsObject[cars[i]].push(roundResult[i]);
    }

    // Console.print(carsObject);

    return carsObject;
}

// 시도 횟수만큼 반복
function iterateRound(tryCount, roundResultNumber, roundResult, carsObject, cars) {
    for (let i = 0; i < Number(tryCount); i++) {
        roundResultNumber = pickNumber(cars);
        roundResult = movingCar(roundResultNumber);

        carsObject = carsRacing(cars, roundResult, carsObject);
    }
    return carsObject;
}


export default class CarModel {
    constructor() {
        this.cars = [];
        this.roundResultNumber = [];
        this.roundResult = [];
        this.carsObject = {};
    }

    namingCar(inputCarName) {
        this.cars = namingCar(inputCarName);
    }

    getResult(tryCount) {

        this.carsObject = iterateRound(tryCount, this.roundResultNumber, this.roundResult, this.carsObject, this.cars);

        Console.print(this.carsObject);
        
    }
}


// result 문자열에 - 추가 -> reduce이용?