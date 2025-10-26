import { Console, Random } from "@woowacourse/mission-utils";

import { ERROR_MESSAGES } from "../constants/ErrorMessages.js";

// 자동차 이름 분리
export function namingCar (inputCarName) {
    const splitInput = inputCarName.split(',');
    const cars = splitInput.map((car) => car.trim());

    const duplicatedName = isDuplicated(cars);
    if (duplicatedName) {
        throw new Error(ERROR_MESSAGES.SAME_CAR_NAME);
    }

    cars.forEach((car) => {
        if (car.length >= 6) {
            throw new Error(ERROR_MESSAGES.LONG_CAR_NAME);
        }
    });

    if (cars.length === 1) {
        throw new Error(ERROR_MESSAGES.ONLY_ONE_CAR);
    }

    return cars;
}

// 자동차 이름 중복 감지
function isDuplicated(arr) {
    const isDup = arr.some(function(x) {
        return arr.indexOf(x) !== arr.lastIndexOf(x);
    });

    return isDup;
}

// 랜덤 숫자 추출 후, 라운드 별 각 숫자 저장
function pickNumber(cars) {
    const roundResultNumber = [];
    for (let i=0; i < cars.length; i++) { 
        roundResultNumber.push(Random.pickNumberInRange(0, 9));
    }

    return roundResultNumber; 
}

// 라운드별 결과 도출 
export function showRoundResult(cars, roundResultNumber, carsResultString) {
    for (let i = 0; i < cars.length; i++) {

        if (roundResultNumber[i] >= 4) carsResultString[i] += "-";
        if (roundResultNumber[i] < 4) carsResultString[i] += "";

        Console.print(`${cars[i]} : ${carsResultString[i]}`);
    }
    Console.print("");
}

// 시도 횟수만큼 반복 후, 최종 결과 return
function iterateRound(tryCount, roundResultNumber, cars) {
    let carsResultString = Array.from({length: cars.length}, () => "");

    Console.print("\n실행 결과");

    for (let i = 0; i < Number(tryCount); i++) {
        roundResultNumber = pickNumber(cars);
        showRoundResult(cars, roundResultNumber, carsResultString);
    }

    // 최종 결과
    return carsResultString;
}

// 마지막 결과를 "자동차 이름: 결과" 객체로 변환
export function finalRoundResult(carsResultString, cars) {
    const finalRoundObj = cars.reduce((acc, value, index) => {
        acc[value] = carsResultString[index];
        return acc;
    }, {});
    
    return finalRoundObj;
}

export default class CarModel {
    constructor() {
        this.cars = [];
        this.roundResultNumber = [];
        this.carsResult = [];
    }

    namingCar(inputCarName) {
        this.cars = namingCar(inputCarName);
    }

    getResult(tryCount) {
        this.carsResult = iterateRound(tryCount, this.roundResultNumber, this.cars);
        return finalRoundResult(this.carsResult, this.cars);
    }
}

