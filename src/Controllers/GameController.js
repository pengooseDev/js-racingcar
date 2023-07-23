import { splitCarNameToArray, validateCarName } from '../utils';

export class GameController {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;
  }

  play() {
    this.#readCarName();
  }

  #readCarName() {
    this.#view.readCarName(this.#validateCarName);
  }

  #validateCarName(userInput) {
    try {
      const carNames = splitCarNameToArray(userInput);
      carNames.forEach((carName) => validateCarName(carName));

      this.#startRacingGame(carNames);
    } catch (error) {}
  }

  #startRacingGame(carNames) {
    this.#model.startRacingGame(carNames);
  }
}
