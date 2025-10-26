import CarModel from "../model/CarModel.js";
import WinnerView from "../view/WinnerView.js";

import { Console } from "@woowacourse/mission-utils";

import { ERROR_MESSAGES } from "../constants/ErrorMessages.js";

export default class CarController {
    constructor() {
        this.model = new CarModel();
        this.winnerView = new WinnerView();
    }

    async run() {
        const inputCarName = await Console.readLineAsync("경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분) \n");
        this.model.namingCar(inputCarName);

        if (inputCarName === "") {
            throw new Error(ERROR_MESSAGES.EMPTY_CAR_NAME);
        }

        const tryCount = await Console.readLineAsync("시도할 횟수는 몇 회인가요? \n");

        if (tryCount === "") {
            throw new Error(ERROR_MESSAGES.EMPTY_TRY_COUNT);
        }

        if (Number(tryCount) > 50) {
            throw new Error(ERROR_MESSAGES.TRY_LIMIT_EXCEEDED);
        }
        
        const finalRoundObj = this.model.getResult(tryCount);
        this.winnerView.winnerChoice(finalRoundObj);
    }
}