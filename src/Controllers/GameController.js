import { splitCarNameToArray, Validation } from '../utils';

export class GameController {
  #model;
  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#readCarName();
  }

  #readCarName() {
    this.#view.readCarName((userInput) => this.#validateCarName(userInput));
  }

  #validateCarName(userInput) {
    try {
      const carNames = splitCarNameToArray(userInput);
      carNames.forEach(Validation.validateCarName);

      this.#handleCarNameInput(carNames);
    } catch (error) {
      this.#handleError(error, () => {
        this.#readCarName();
      });
    }
  }

  #handleCarNameInput(carNames) {
    this.#model.setCars(carNames);

    this.#readTotalRound();
  }

  #readTotalRound() {
    this.#view.readTotalRound((userInput) =>
      this.#validateTotalRound(userInput)
    );
  }

  #validateTotalRound(userInput) {
    try {
      Validation.validateTotalRounds(userInput);

      this.#handleTotalRoundInput(userInput);
    } catch (error) {
      this.#handleError(error, this.#readTotalRound.bind(this));
    }
  }

  #handleTotalRoundInput(userInput) {
    this.#model.setTotalRounds(userInput);

    this.#startRacingGame();
  }

  #startRacingGame() {
    this.#model.startRace();

    this.#printGameResult();
  }

  #printGameResult() {
    const gameResult = this.#model.getGameResult();

    this.#view.printGameResult(gameResult);
  }

  #printError(error) {
    this.#view.printError(error);
  }

  #handleError(error, phaseToRetry) {
    this.#printError(error.message);

    phaseToRetry();
  }
}
