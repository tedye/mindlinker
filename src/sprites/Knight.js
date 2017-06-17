/**
 * Created by kfang on 6/16/17.
 */
import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({game, x, y, asset, frame}) {
    super(game, x, y, asset, frame)
    this.xOffset = 0
    this.yOffset = 0
  }
  update () {
    this.x += this.xOffset
    this.y += this.yOffset
  }
}
