/**
 * Created by kfang on 7/23/17.
 */
import Phaser from 'phaser'
import PrincessStoryState from './PrincessStoryBoard'

export default class extends Phaser.State {
    init() {
        console.log('Princess Boot Init.')
    }

    preload() {
        console.log('Princess Boot Preload.')
        this.game.load.text('gameContext', this.game.global.currentStoryConfig)
        this.game.state.add('PrincessStoryBoard', PrincessStoryState, false)
    }

    render() {
        console.log('Princess Boot Render.')
        this.state.start('PrincessStoryBoard')
    }
}
