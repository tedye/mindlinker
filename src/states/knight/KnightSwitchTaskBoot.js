/**
 * Created by kfang on 6/27/17.
 */
import Phaser from 'phaser'

export default class extends Phaser.State {
    setCurrentGameContext() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
    }

    init() {
        console.log('KnightSwitchTaskBoot Init.')
        this.setCurrentGameContext()
    }

    loadCurrentTaskConfig() {
        let taskIndex = this.game.global.currentTaskIndex
        console.log('Current task index: ' + taskIndex)
        console.log('Current task conf: ' + this.gameContext.task_configs[taskIndex])
        this.game.load.text('taskContext', this.gameContext.task_configs[taskIndex])
    }

    preload() {
        console.log('KnightSwitchTaskBoot Preload.')
        this.loadCurrentTaskConfig()
    }

    render() {
        console.log('KnightSwitchTaskBoot Render.')
        this.state.start('KnightAnimationBoard')
    }
}