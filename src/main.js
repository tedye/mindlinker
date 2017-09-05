import 'pixi'
import 'p2'
import Phaser from 'phaser'
import RootBootState from './states/RootBoot'

class Game extends Phaser.Game {
    constructor() {
        super(window.screen.availWidth, window.screen.availHeight, Phaser.CANVAS, 'content', null)

        this.state.add('RootBoot', RootBootState, false)
        this.state.start('RootBoot')
    }
}

window.game = new Game()
