import { GameEvents } from '../common/enums/GameEvents';
import { Message } from '../common/types/Message';

export class APIService {
  private _bet = 10;
  private _handler: (data: Message) => void;

  constructor() {
    window.addEventListener('message', this.handleMessage.bind(this));
  }

  public setBet(bet: number) {
    this._bet = bet;
  }

  public setHandler(fn: (data: Message) => void) {
    this._handler = fn;
  }

  private handleMessage(event: MessageEvent) {
    this._handler?.(event.data);
  }

  public spin(index: number, line: number) {
    this.sendRequest({ type: GameEvents.SPIN, bet: this._bet, index, line });
  }

  public updateBalance(balance: number) {
    this.sendRequest({ type: GameEvents.UPDATE_BALANCE, balance });
  }

  private sendRequest(request: any) {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(request, '*');
    }
  }

  public get bet(): number {
    return this._bet;
  }
}
