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
// function movingCar(roundResultNumber) {
//     const roundResult = [];

//     roundResultNumber.forEach((number) => {
//         if (number >= 4) roundResult.push("-");
//         if (number < 4) roundResult.push("0");
//     });

//     Console.print(roundResult);
//     return roundResult; 
// }


// 라운드별 결과 도출 
function showRoundResult(cars, roundResultNumber, carsResultString) {
    for (let i = 0; i < cars.length; i++) {

        if (roundResultNumber[i] >= 4) carsResultString[i] += "-";
        if (roundResultNumber[i] < 4) carsResultString[i] += "";

        Console.print(`${cars[i]} : ${carsResultString[i]}`);
    }

    Console.print("");
}

// 시도 횟수만큼 반복
function iterateRound(tryCount, roundResultNumber, cars) {
    let carsResultString = Array.from({length: cars.length}, () => "");

    Console.print("\n실행 결과");

    for (let i = 0; i < Number(tryCount); i++) {
        roundResultNumber = pickNumber(cars);
        // roundResult = movingCar(roundResultNumber);

        showRoundResult(cars, roundResultNumber, carsResultString);
    }

    // 마지막 결과
    Console.print(`마지막 값: ${carsResultString}`);

    const finalRoundObj = cars.reduce((acc, value, index) => {
        acc[value] = carsResultString[index];
        return acc;
    }, {});
    
    Console.print(finalRoundObj);

    return finalRoundObj;
}

export default class CarModel {
    constructor() {
        this.cars = [];
        this.roundResultNumber = [];
        // this.roundResult = [];
    }

    namingCar(inputCarName) {
        this.cars = namingCar(inputCarName);
    }

    getResult(tryCount) {
        return iterateRound(tryCount, this.roundResultNumber, this.cars);
    }
}

