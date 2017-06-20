/**
 * Created by kfang on 6/19/17.
 */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
  }

  preload () {
    this.game.global = {}
    this.game.global.currentGameConfig = 'assets/conf/knight_base_config.json'
    this.game.global.currentGameIndex = 0
  }

  render () {
    this.state.start('KnightBoot')
  }
}
