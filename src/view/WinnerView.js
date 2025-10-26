import { Console } from "@woowacourse/mission-utils";


// // 차수별 실행 결과
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
        Console.print(`뷰 내부 입니다.`);
    
        winnerShow(data);
    }
}