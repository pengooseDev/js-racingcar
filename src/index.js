import { GameController } from './Controllers/GameController';
import { RacingGame } from './Domains';
import { InputView, OutputView, View } from './Views';

export class App {
  #gameController;

  constructor() {
    const model = new RacingGame();
    const view = new View(InputView, OutputView);

    this.#gameController = new GameController(model, view);
  }
}

new App();
