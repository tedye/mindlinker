/**
 * Created by kfang on 6/19/17.
 */
import Phaser from 'phaser'

export default class extends Phaser.State {
    init() {
        console.log('Root Boot Init.')
    }

    preload() {
        console.log('Root Boot Preload.')
        this.game.global = {}
        this.game.global.currentStoryConfig = 'assets/conf/knight/knight_base_config.json'
        this.game.global.currentTaskIndex = 0
    }

    render() {
        console.log('Root Boot Render.')
        this.state.start('KnightBoot')
    }
}
