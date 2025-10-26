import { Console } from "@woowacourse/mission-utils";

// 우승자 추출 및 최종 우승자 출력
export function winnerShow(data) {
    let winner = [];
    let max = "";

    for (const car in data) {
        if (max.length < data[car].length) {
            max = data[car];

            // 우승자 업데이트
            winner = [car];
        }
        // 공동 우승자 처리 
        else if (max.length === data[car].length) {
            winner.push(car);
        }
    }

    const winnerMessage =  `최종 우승자 : ${winner.join(', ')}`;
    Console.print(winnerMessage);

    return winnerMessage;
}
 
export default class WinnerView {
    winnerChoice(data) {
        winnerShow(data);
    }
}