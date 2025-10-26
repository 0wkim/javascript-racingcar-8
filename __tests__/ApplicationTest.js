import App from "../src/App.js";
import { Console, MissionUtils } from "@woowacourse/mission-utils";

import { namingCar, showRoundResult } from "../src/model/CarModel.js";
import { winnerShow } from "../src/view/WinnerView.js";
import { ERROR_MESSAGES } from "../src/constants/ErrorMessages.js";

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

  // 자동차 이름 빈 값 예외 테스트
  test("자동차 이름 빈 값 예외 테스트", async () => {
    // given
    const inputs = [""];
    mockQuestions(inputs);
    // Console.readLineAsync.mockReturnValueOnce("");
  
    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow(ERROR_MESSAGES.EMPTY_CAR_NAME);
  });

  // 기타 사용자 입력 값 예외 테스트
  test("기타 사용자 입력값 예외 테스트", async () => {
    expect(() => namingCar("pobirey, yw")).toThrow(ERROR_MESSAGES.LONG_CAR_NAME);
    expect(() => namingCar("pobi, pobi")).toThrow(ERROR_MESSAGES.SAME_CAR_NAME);
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
