import { Item } from '../classes/sprite/Item';
import { BackgroundKeys } from '../common/enums/BackgroundKeys';
import { SceneKeys } from '../common/enums/SceneKeys';
import { SpritesKeys } from '../common/enums/SpritesKeys';
import { Message } from '../common/types/Message';
import { BaseScene } from './BaseScene';
import { ScoreManager } from '../classes/score/ScoreManager';
import { BetButtonType, ButtonBet } from '../classes/buttons/BetButtons';
import { api } from '../services';
import ButtonStart from '../classes/buttons/ButtonStart';
import ButtonGet from '../classes/buttons/ButtonGet';
import { MessageTypes } from '../common/enums/MessageTypes';

export class Game extends BaseScene {
  private _playing: boolean;
  private _items: Item[][] = [[], [], [], [], [], []];
  private _betButtons: any[] = [];
  private _buttonStart: ButtonStart;
  private _buttonGet: ButtonGet;
  private _manager: ScoreManager;

  private _line = 0;

  constructor() {
    super(SceneKeys.GAME);
  }

  public create() {
    super.create();
    this.setBackgroundDefault();
    this.createGameObjects();
    this.createButtons();

    api.setHandler(this.handleMessage.bind(this));
  }

  private handleMessage(message: Message) {
    if (!message.type) {
      return;
    }

    this._manager.setBalance(message.balance);
    api.updateBalance(message.balance);
    for (let i = 0; i < this._items[message.line].length; i++) {
      this._items[i][message.line].setTexture(message.symbols[i] ? SpritesKeys.WIN : SpritesKeys.LOSE);

      if (i === message.index) {
        this._items[i][message.line].clearTint();
      }
    }

    if (message.type === MessageTypes.LOSE) {
      this.setBackgroundLose();
      this._betButtons.forEach((item) => item.undisable());
      this._playing = false;
      this._buttonGet.disable();
      this._buttonStart.undisable();
    }
  }

  private createButtons() {
    const buttonBetWidth = 90;
    const buttonBetHeight = 130;

    this._betButtons.push(
      new ButtonBet(this, buttonBetWidth, buttonBetHeight, BetButtonType.IMAGE, this.widthScene / 14),
    );

    this._betButtons.push(
      new ButtonBet(
        this,
        buttonBetWidth + buttonBetWidth / 2,
        buttonBetHeight,
        BetButtonType.PLUS,
        this.widthScene / 22,
        () => this._manager.setBet(api.bet + 1),
      ),
    );

    this._betButtons.push(
      new ButtonBet(
        this,
        buttonBetWidth - buttonBetWidth / 2,
        buttonBetHeight,
        BetButtonType.MINUS,
        this.widthScene / 22,
        () => this._manager.setBet(api.bet - 1),
      ),
    );

    this._manager = new ScoreManager(this, this.heightScene, this.widthScene);
    this._buttonStart = new ButtonStart(this, this.widthScene / 1.5, this.heightScene - 80, () =>
      this.handleButtonStartClick(),
    );

    this._buttonGet = new ButtonGet(
      this,
      this.widthScene / 2.5,
      this.heightScene - 80,
      this.handleButtonGetClick.bind(this),
    );
  }

  private handleButtonStartClick() {
    this._items = [[], [], [], [], [], []];
    this._line = 0;

    this.createGameObjects();
    this.setBackgroundDefault();

    this._betButtons.forEach((item) => item.disable());
    this._playing = true;
    this._buttonStart.disable();
    this._buttonGet.undisable();
  }

  private handleButtonGetClick() {
    this._betButtons.forEach((item) => item.undisable());
    this._playing = false;
    this._buttonGet.disable();
    this._buttonStart.undisable();
  }

  private setBackgroundDefault() {
    this.createBackground(this, 0, 0, this.widthScene, this.heightScene, BackgroundKeys.BACKGROND);
  }

  private setBackgroundLose() {
    this.createBackground(this, 0, 0, this.widthScene, this.heightScene, BackgroundKeys.BACKGROND_LOSE);
  }

  private handleClick(index: number, line: number) {
    if (!this._playing || this._line !== line) {
      return;
    }

    api.spin(index, line);
    for (let i = 0; i < this._items[this._line].length; i++) {
      this._items[i][this._line].setTint(0x999999);
    }

    this._line++;
  }

  private createGameObjects() {
    const size = this.widthScene / 10;
    const startPosWidth = this.widthScene / 2.8 - this.widthScene / 3 - size;
    const startPosHeight = this.heightScene / 2 - this.heightScene / 6 - size;
    const padding = 1.65;

    for (let i = 1; i < 7; i++) {
      for (let j = 1; j < 7; j++) {
        this._items[i - 1].push(
          new Item(
            this,
            startPosWidth + i * (size * padding),
            startPosHeight + j * (size * padding),
            SpritesKeys.PLACE,
            size,
            this.handleClick.bind(this, i - 1, j - 1),
          ),
        );
      }
    }
  }
}
