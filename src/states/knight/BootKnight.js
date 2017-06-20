import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
  }

  preload () {
    this.game.load.text('gameContext', this.game.global.currentGameConfig)
  }

  render () {
    this.state.start('KnightAnimationBoard')
  }
}
