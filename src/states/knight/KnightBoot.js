import Phaser from 'phaser'
import KnightStoryState from './KnightStoryBoard'
import {logDebugInfo} from '../../Logger'

export default class extends Phaser.State {
    init() {
        logDebugInfo('Knight Boot Init.')
    }

    preload() {
        logDebugInfo('Knight Boot Preload.')
        this.loadGameContextAndAddStoryState()
    }

    loadGameContextAndAddStoryState() {
        this.game.load.text('gameContext', this.game.global.currentStoryConfig)
        this.game.state.add('KnightStoryBoard', KnightStoryState, false)
    }

    render() {
        logDebugInfo('Knight Boot Render.')
        this.navigateToStoryState()
    }

    navigateToStoryState() {
        this.state.start('KnightStoryBoard')
    }
}
