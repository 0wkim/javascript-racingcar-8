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
// function carsRacing(cars, roundResult, carsObject) {
//     // const addRoundResult = [];
//     for (let i = 0; i < cars.length; i++) {
//         if(!carsObject[cars[i]]) carsObject[cars[i]] = [];

//         carsObject[cars[i]].push(roundResult[i]);
//     }

//     Console.print(carsObject);

//     return carsObject;
// }

// 라운드별 결과 도출 
function showRoundResult(cars, roundResult, carsResultString) {
    for (let i = 0; i < cars.length; i++) {

        if (roundResult[i] === "-") carsResultString[i] += "-";
        if (roundResult[i] === "0") carsResultString[i] += "";

        Console.print(`${cars[i]} : ${carsResultString[i]}`);
    }

    Console.print("");
}

// 시도 횟수만큼 반복
function iterateRound(tryCount, roundResultNumber, roundResult, cars) {
    let carsResultString = Array.from({length: cars.length}, () => "");

    for (let i = 0; i < Number(tryCount); i++) {
        roundResultNumber = pickNumber(cars);
        roundResult = movingCar(roundResultNumber);

        showRoundResult(cars, roundResult, carsResultString);

        // carsObject = carsRacing(cars, roundResult, carsObject);
    }
    // return carsObject;
    return roundResult;
}

// 라운드별 결과 도출 



export default class CarModel {
    constructor() {
        this.cars = [];
        this.roundResultNumber = [];
        this.roundResult = [];
        this.carsObject = {};
        // this.resultString = "";
        // this.everyRoundResult = [];
    }

    namingCar(inputCarName) {
        this.cars = namingCar(inputCarName);
    }

    getResult(tryCount) {

        // this.carsObject = iterateRound(tryCount, this.roundResultNumber, this.roundResult, this.carsObject, this.cars);

        // Console.print(this.carsObject);

        iterateRound(tryCount, this.roundResult, this.roundResultNumber, this.cars);
        
    }
}

