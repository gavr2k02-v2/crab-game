import Phaser from 'phaser';
import { STYLE_TEXT } from '../common/constants';
import { BackgroundKeys } from '../common/enums/BackgroundKeys';
import { SceneKeys } from '../common/enums/SceneKeys';
import { SpritesKeys } from '../common/enums/SpritesKeys';
import { TextureKeys } from '../common/enums/TextureKeys';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.PRELOADER);
  }

  public preload() {
    this.add
      .text(this.scale.width / 2, this.scale.height / 2, 'LOADING CONTENT', {
        ...STYLE_TEXT,
        fontFamily: `roboto, sans-serif`,
      })
      .setOrigin(0.5);

    this.uploadImages();
  }

  public create(): void {
    this.scene.start(SceneKeys.GAME);
  }

  private uploadImages() {
    this.load.image(BackgroundKeys.BACKGROND, 'images/background/game.png');
    this.load.image(BackgroundKeys.BACKGROND_LOSE, 'images/background/game_lose.png');

    this.load.image(TextureKeys.BUTTON_START, 'images/textures/start_button.png');
    this.load.image(TextureKeys.BUTTON_START_PRESED, 'images/textures/start_presed.png');

    this.load.image(TextureKeys.BUTTON_GET, 'images/textures/get_button.png');
    this.load.image(TextureKeys.BUTTON_GET_PRESED, 'images/textures/get_pressed.png');

    this.load.image(TextureKeys.BET_IMAGE, 'images/textures/bet_image.png');
    this.load.image(TextureKeys.BET_PLUS, 'images/textures/bet_plus.png');
    this.load.image(TextureKeys.BET_MINUS, 'images/textures/bet_minus.png');

    this.load.image(SpritesKeys.LOSE, 'images/sprites/lose_money.png');
    this.load.image(SpritesKeys.WIN, 'images/sprites/win_money.png');
    this.load.image(SpritesKeys.PLACE, 'images/sprites/plot.png');
  }
}
