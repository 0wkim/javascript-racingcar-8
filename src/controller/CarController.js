import CarModel from "../model/CarModel.js";

import CarView from "../view/CarView.js";
import WinnerView from "../view/WinnerView.js";

import { Console } from "@woowacourse/mission-utils";

export default class CarController {
    constructor() {
        this.model = new CarModel();
        this.carView = new CarView();
        this.winnerView = new WinnerView();
    }

    async run() {
        // 왜 await 사용?
        const inputCarName = await Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분) \n");
        const tryCount = await Console.readLineAsync("시도할 횟수는 몇 회인가요? \n");

        this.model.namingCar(inputCarName);
        this.model.getResult(tryCount);

        // const result = this.model.getResult();
        // Console.print(result);
        
    }
}