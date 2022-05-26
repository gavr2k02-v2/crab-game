import { STYLE_TEXT } from '../../common/constants';
import { api } from '../../services';

export class ScoreManager {
  private _balance: number;
  private _bet = 10;
  private _widthScene: number;
  private _heightScene: number;

  private _balanceTitle: Phaser.GameObjects.Text;
  private _betTitle: Phaser.GameObjects.Text;

  constructor(private _scene: Phaser.Scene, h: number, w: number) {
    this.init(h, w);
  }

  private init(h: number, w: number) {
    this._widthScene = w;
    this._heightScene = h;

    this.create();
    this.print();
  }

  private create(): void {
    const style = {
      ...STYLE_TEXT,
      fontSize: '2rem',
      backgroundColor: 'rgb(127, 145, 164)',
      borderRadius: '5px',
      color: 'white',
    };

    this._scene.add.text(20, 32, `Balance: `, style).setOrigin(0, 0).setDepth(2);
    this._balanceTitle = this._scene.add.text(180, 32, '', style).setOrigin(0, 0).setDepth(2);

    this._scene.add.text(20, 64, `Bet    : `, style).setOrigin(0, 0).setDepth(2);
    this._betTitle = this._scene.add.text(180, 64, '', style).setOrigin(0, 0).setDepth(2);

    this.drawScores();
  }

  private print() {
    this._balanceTitle.setText(this._balance ? `${this.padding(this._balance)}` : '*********');
    this._betTitle.setText(`${this.padding(this._bet)}`);
    this.drawScores();
  }

  private padding(num: number): string {
    return `${num}`.padStart(9, '0');
  }

  public setBalance(balance: number): void {
    this._balance = balance;
    this.print();
  }

  private drawScores() {
    const style = {
      ...STYLE_TEXT,
      fontSize: '2rem',
      backgroundColor: 'rgb(127, 145, 164)',
      borderRadius: '5px',
      color: 'white',
    };

    const size = this._widthScene / 10;
    const startPosHeight = this._heightScene / 2 - this._heightScene / 6 - size;
    const padding = 1.65;

    for (let i = 1; i < 7; i++) {
      const bet = Math.floor(this._bet + Math.pow(this._bet / 5, i));
      this._scene.add
        .text(20, startPosHeight + i * (size * padding), bet.toString(), style)
        .setOrigin(0, 0)
        .setDepth(2);
    }
  }

  public setBet(bet: number): void {
    if (bet < 10) {
      return;
    }

    this._bet = bet;
    api.setBet(bet);
    this.print();
  }
}
