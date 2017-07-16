import Phaser from 'phaser'
import KnightStoryState from './KnightStoryBoard'

export default class extends Phaser.State {
    init() {
        console.log('Knight Boot Init.')
    }

    preload() {
        console.log('Knight Boot Preload.')
        this.game.load.text('gameContext', this.game.global.currentStoryConfig)
        this.game.state.add('KnightStoryBoard', KnightStoryState, false)
    }

    render() {
        console.log('Knight Boot Render.')
        this.state.start('KnightStoryBoard')
    }
}
