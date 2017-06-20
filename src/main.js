import 'pixi'
import 'p2'
import Phaser from 'phaser'

import RootBootState from './states/RootBoot'
import BootKnightState from './states/knight/BootKnight'
import KnightAnimationBoardState from './states/knight/KnightAnimationBoard'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    super(window.screen.availWidth, window.screen.availHeight * 0.7, Phaser.CANVAS, 'content', null)

    this.state.add('RootBoot', RootBootState, false)
    this.state.add('KnightBoot', BootKnightState, false)
    this.state.add('KnightAnimationBoard', KnightAnimationBoardState, false)

    this.state.start('RootBoot')
  }
}

window.game = new Game()
