import { Console } from "@woowacourse/mission-utils";


// // 차수별 실행 결과

// // 자동차별 실행 결과
// function showCarResult(resultObject, tryCount) {
//     const resultString = "";
//     for (let i = 0; i < Object.keys(resultObject).length; i++) {
//         for (let j = 0; j < Object.values(resultObject).length; j++) {
//              Console.print(`${Object.keys(resultObject)[i]} `);

//             if (Object.values(resultObject)[i] === "-") resultString += "-";
//             if (Object.values(resultObject)[i] === "0") resultString += "";

//             Console.print(`: ${resultString} \n`);
//         }
//     }

    
    

//     for (const car in resultObject) {
//         Console.print(`${car} : ${car.keys().shift()}`)
//     }
// }

// // 차수별 실행 결과
// function showResult(tryCount, resultObject) {
//     Console.print("실행 결과 \n");

//     for(let i = 0; i < Number(tryCount); i++) {
//         showCarResult(resultObject);
//     }
// }

function winnerShow(data) {
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

    Console.print(`최종 우승자 : ${winner.join(', ')}`);
    
}
 
export default class WinnerView {
    winnerChoice(data) {
        Console.print(`뷰 내부 입니다.`);
    
        winnerShow(data);
    
    }

    // this.model.getResult();
}