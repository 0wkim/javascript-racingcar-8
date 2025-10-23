import CarModel from "../model/CarModel";

import CarView from "../view/CarView";
import WinnerView from "../view/WinnerView";

import { Console } from "@woowacourse/mission-utils";

export default class CarController {
    constructor() {
        this.model = new CarModel();
        this.carView = new CarView();
        this.winnerView = new WinnerView();
    }

    async run() {
        const carName = Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분) \n");
        const tryCount = Console.readLineAsync("시도할 횟수는 몇 회인가요? \n");
    }
}