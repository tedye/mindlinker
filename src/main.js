import 'pixi'
import 'p2'
import Phaser from 'phaser'
import RootBootState from './states/RootBoot'

class Game extends Phaser.Game {
    constructor() {
        super(Math.max(window.screen.availWidth, window.screen.availHeight), Math.min(window.screen.availWidth, window.screen.availHeight) - 50, Phaser.CANVAS, 'content', null)

        this.state.add('RootBoot', RootBootState, false)
        this.state.start('RootBoot')
    }
}

window.game = new Game()
