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
    if (this.actionQueue.length > 0 && (this.playingAnimation === null || this.playingAnimation.isFinished)) {
      this.playNextAction()
    } else if (this.actionQueue.length === 0 && this.playingAnimation !== null && this.playingAnimation.isFinished) {
      this.showButtons()
    }
  }

  showButtons() {
    this.restartButton = this.game.add.button(this.game.world.centerX - 60, this.game.world.centerY, 'restart', this.restart, this)
    this.restartButton.scale.setTo(0.3, 0.3)
    this.restartButton.anchor.setTo(0.5, 0.5)
    this.restartButton.events.onInputOver.add(this.showRestartTooltip, this)
    this.restartButton.events.onInputOut.add(this.destroyTooltip, this)
    this.nextButton = this.game.add.button(this.game.world.centerX + 60, this.game.world.centerY, 'next', this.nextGame, this)
    this.nextButton.scale.setTo(0.3, 0.3)
    this.nextButton.anchor.setTo(0.5, 0.5)
    this.nextButton.events.onInputOver.add(this.showNextTaskTooltip, this)
    this.nextButton.events.onInputOut.add(this.destroyTooltip, this)
  }

  playNextAction () {
    let nextAction = this.actionQueue.shift()
    console.log('Update: play animation ' + nextAction.name + ' with xOffset: ' + nextAction.xOffset + ' and yOffset: ' + nextAction.yOffset)
    let newX = this.x + nextAction.xOffset
    let newY = this.y + nextAction.yOffset
    this.playingAnimation = this.animations.play(nextAction.name)
    this.game.add.tween(this).to({x: newX, y: newY}, 1000, null, true)
  }

  destroyAllButtons() {
    this.restartButton.destroy()
    this.nextButton.destroy()
  }

  restart () {
    this.destroyAllButtons()
    this.game.state.restart()
  }

  nextGame () {
    this.destroyAllButtons()
    this.game.state.restart()
  }

  showRestartTooltip () {
    this.tooltip = this.game.add.text(this.game.world.centerX - 60, this.game.world.centerY - 100, 'Restart the game.')
  }

  showNextTaskTooltip() {
    this.tooltip = this.game.add.text(this.game.world.centerX + 60, this.game.world.centerY - 100, 'Start next game.')
  }

  destroyTooltip () {
    this.tooltip.destroy()
  }
}
