/**
 * Created by kfang on 6/16/17.
 */
import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({game, x, y, asset, frame}) {
    super(game, x, y, asset, frame)
    this.actionQueue = []
    this.playingAnimation = null
  }
  update () {
    console.log('Update time: ' + this.game.time.totalElapsedSeconds())
    if (this.actionQueue.length > 0 && (this.playingAnimation === null || this.playingAnimation.isFinished)) {
      let nextAction = this.actionQueue.shift()
      console.log('Update: play animation ' + nextAction.name + ' with xOffset: ' + nextAction.xOffset + ' and yOffset: ' + nextAction.yOffset)
      let newX = this.x + nextAction.xOffset
      let newY = this.y + nextAction.yOffset
      this.playingAnimation = this.animations.play(nextAction.name)
      this.game.add.tween(this).to({x: newX, y: newY}, 1000, null, true)
    } else if (this.playingAnimation !== null && this.playingAnimation.isFinished) {
      console.log(this.playingAnimation.name + ' finished with count: ' + this.count)
    }
  }
}
