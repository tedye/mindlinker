/**
 * Created by kfang on 6/27/17.
 */
import Phaser from 'phaser'

export default class extends Phaser.State {
    setCurrentGameContext() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
    }

    init() {
        console.log('KnightTaskBoot Init.')
        this.setCurrentGameContext()
    }

    loadCurrentTaskConfig() {
        let taskIndex = this.game.global.currentTaskIndex
        console.log('Current task conf: ' + this.gameContext.task_configs.tasks[taskIndex].taskConf)
        this.game.load.text('taskContext', this.gameContext.task_configs.tasks[taskIndex].taskConf)
    }

    preload() {
        console.log('KnightTaskBoot Preload.')
        this.loadCurrentTaskConfig()
    }

    render() {
        console.log('KnightTaskBoot Render.')
        this.state.start('KnightAnimationBoard')
    }
}