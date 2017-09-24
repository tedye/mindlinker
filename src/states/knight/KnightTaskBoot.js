/**
 * Created by kfang on 6/27/17.
 */
import Phaser from 'phaser'
import {logDebugInfo} from '../../Logger'

export default class extends Phaser.State {
    setCurrentGameContext() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
    }

    init() {
        logDebugInfo('KnightTaskBoot Init.')
        this.setCurrentGameContext()
    }

    loadCurrentTaskConfig() {
        let taskIndex = this.game.global.currentTaskIndex
        logDebugInfo('Current task conf: ' + this.gameContext.task_configs.tasks[taskIndex].taskConf)
        this.game.load.text('taskContext', this.gameContext.task_configs.tasks[taskIndex].taskConf)
    }

    preload() {
        logDebugInfo('KnightTaskBoot Preload.')
        this.loadCurrentTaskConfig()
    }

    render() {
        logDebugInfo('KnightTaskBoot Render.')
        this.state.start('KnightAnimationBoard')
    }
}