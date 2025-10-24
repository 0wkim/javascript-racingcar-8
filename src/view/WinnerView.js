// import { Console } from "@woowacourse/mission-utils";

// import CarModel from "../model/CarModel";


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
 
export default class WinnerView {
    // constructor() {
    //     this.model = new CarModel();
    // }

    // this.model.getResult();
}