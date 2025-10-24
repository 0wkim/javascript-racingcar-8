import CarController from "./controller/CarController.js";

class App {
  async run() {
    const controller = new CarController();
    await controller.run();
  }
}

export default App;
