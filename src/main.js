import 'pixi'
import 'p2'
import Phaser from 'phaser'

import RootBootState from './states/RootBoot'
import KnightBootState from './states/knight/KnightBoot'
import KnightStoryState from './states/knight/KnightStoryBoard'
import KnightAnimationBoardState from './states/knight/KnightAnimationBoard'
import KnightSwitchTaskBootState from './states/knight/KnightSwitchTaskBoot'

class Game extends Phaser.Game {
    constructor() {
        super(window.screen.availWidth, window.screen.availHeight * 0.83, Phaser.CANVAS, 'content', null)

        this.state.add('RootBoot', RootBootState, false)
        this.state.add('KnightBoot', KnightBootState, false)
        this.state.add('KnightStoryBoard', KnightStoryState, false)
        this.state.add('KnightAnimationBoard', KnightAnimationBoardState, false)
        this.state.add('KnightSwitchTaskBoot', KnightSwitchTaskBootState, false)

        this.state.start('RootBoot')
    }
}

window.game = new Game()
