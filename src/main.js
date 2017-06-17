import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import AnimationBoardState from './states/AnimationBoard'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    super(config.gameWidth, config.gameHeight, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('AnimationBoard', AnimationBoardState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
