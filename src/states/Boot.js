import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
  }

  preload () {
    this.game.load.text('gameContext', 'assets/conf/knight_base_config.json')
  }

  render () {
    this.state.start('AnimationBoard')
  }
}
