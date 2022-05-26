import { SpritesKeys } from '../../common/enums/SpritesKeys';

export class Item extends Phaser.Physics.Arcade.Sprite {
  private _hanldeClick: () => void;

  constructor(scene: Phaser.Scene, x: number, y: number, key: SpritesKeys, size: number, handleClick: () => void) {
    super(scene, x, y, key);
    this.init(size);

    this._hanldeClick = handleClick as () => void;
    this.on('pointerdown', this.pointerDownHandler.bind(this));
  }

  private init(szie: number) {
    this.scene.add.existing(this);
    this.setDepth(1);
    this.setOrigin(0.5);
    this.setDisplaySize(szie, szie);
    this.setInteractive();
  }

  private pointerDownHandler() {
    this._hanldeClick();
  }
}
