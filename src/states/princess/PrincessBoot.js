/**
 * Created by kfang on 7/23/17.
 */
import Phaser from 'phaser'
import PrincessStoryState from './PrincessStoryBoard'
import {logDebugInfo} from '../../Logger'

export default class extends Phaser.State {
    init() {
        logDebugInfo('Princess Boot Init.')
    }

    preload() {
        logDebugInfo('Princess Boot Preload.')
        this.loadGameContextAndAddStoryState();
    }

    loadGameContextAndAddStoryState() {
        this.game.load.text('gameContext', this.game.global.currentStoryConfig)
        this.game.state.add('PrincessStoryBoard', PrincessStoryState, false)
    }

    render() {
        logDebugInfo('Princess Boot Render.')
        this.navigateToStoryState();
    }

    navigateToStoryState() {
        this.state.start('PrincessStoryBoard')
    }
}
