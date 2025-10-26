import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

import { showRoundResult } from "../src/model/CarModel.js";
import { winnerShow } from "../src/view/WinnerView.js";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("자동차 경주", () => {
  test("기능 테스트", async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni", "1"];
    const logs = ["pobi : -", "woni : ", "최종 우승자 : pobi"];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test("예외 테스트", async () => {
    // given
    const inputs = ["pobi,javaji"];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow("[ERROR]");
  });

  // 숫자로 전진 여부가 잘 계산되는 지 확인
  test("전진 테스트", async () => {
    // given
    const cars = ["pobi", "rey", "yw"];
    const roundResultNumber = [4, 3, 9];  
    const carsResultString = ["", "", ""];

    // when
    showRoundResult(cars, roundResultNumber, carsResultString);

    // then
    expect(carsResultString).toEqual(["-", "", "-"]);
  });

  // 우승자 출력 확인
  test("우승자 판별 테스트", async () => {
    // given
    const data = {
      pobi: "---",
      rey: "-", 
      yw: "---"
    }

    // when
    const winner = winnerShow(data);

    // then
    expect(winner).toEqual("최종 우승자 : pobi, yw");
  });
});
